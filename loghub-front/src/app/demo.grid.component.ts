import { Component, ViewChild } from "@angular/core";
import "ag-grid-community";
import { Observable, from } from 'rxjs';
import * as _ from "lodash";


@Component({
    selector: "demo-grid",
    templateUrl: "./demo.grid.component.html",
    styleUrls: ['./demo.grid.component.css'],
})


export class DemoGridComponent {
    private gridApi;
    private gridColumnApi;

    public columnDefs;
    public defaultColDef;
    public getRowNodeId;
    public rowData: [];

    constructor() {
        this.columnDefs = [
            {
                headerName: "Code",
                field: "code",
                width: 70
            },
            {
                headerName: "Name",
                field: "name",
                width: 300
            },
            {
                headerName: "Bid",
                field: "bid",
                width: 100,
                cellClass: "cell-number",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer"
            },
            {
                headerName: "Mid",
                field: "mid",
                width: 100,
                cellClass: "cell-number",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer"
            },
            {
                headerName: "Ask",
                field: "ask",
                width: 100,
                cellClass: "cell-number",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer"
            },
            {
                headerName: "Volume",
                field: "volume",
                width: 80,
                cellClass: "cell-number",
                cellRenderer: "agAnimateSlideCellRenderer"
            }
        ];
        this.defaultColDef = { resizable: true };
        this.getRowNodeId = data => data.code;
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();

        let mockServer = createMockServer();
        const initialLoad$ = mockServer.initialLoad();
        const updates$ = mockServer.byRowupdates();
        initialLoad$.subscribe(rowData => {
            params.api.setRowData(rowData);
            updates$.subscribe(updates => params.api.updateRowData({ update: updates }));
        });
    }
}

function numberFormatter(params) {
    if (typeof params.value === "number") {
        return params.value.toFixed(2);
    } else {
        return params.value;
    }
}
function createMockServer() {
    function MockServer() {
        "use strict";
        this.rowData = [];
    }
    MockServer.prototype.initialLoad = function () {
        return from(
            new Promise((resolve, reject) => {
                let httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", "https://rawgit.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/stocks.json");
                httpRequest.send();
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                        let dataSet = JSON.parse(httpRequest.responseText);
                        let reducedDataSet = dataSet.slice(0, 200);
                        this.rowData = this.backfillData(reducedDataSet);
                        resolve(_.cloneDeep(this.rowData));
                        console.log('rowData are laoded');
                    }
                };
            })
        );
    };
    MockServer.prototype.byRowupdates = function () {
        return Observable.create(observer => {
            const interval = setInterval(() => {
                let changes = [];
                this.makeSomePriceChanges(changes);
                this.makeSomeVolumeChanges(changes);
                observer.next(changes);
            }, 1000);
            return () => clearInterval(interval);
        });
    };
    MockServer.prototype.allDataUpdates = function () {
        return Observable.create(observer => {
            const interval = setInterval(() => {
                let changes = [];
                this.makeSomePriceChanges(changes);
                this.makeSomeVolumeChanges(changes);
                observer.next(_.cloneDeep(this.rowData));
            }, 1000);
            return () => clearInterval(interval);
        });
    };
    MockServer.prototype.backfillData = function (rowData) {
        rowData.forEach(dataItem => {
            dataItem.volume = Math.floor(Math.random() * 10000 + 100);
            dataItem.mid = Math.random() * 300 + 20;
            this.setBidAndAsk(dataItem);
        });
        return rowData;
    };
    MockServer.prototype.makeSomeVolumeChanges = function (changes) {
        for (let i = 0; i < 10; i++) {
            const index = Math.floor(this.rowData.length * Math.random());
            const currentRowData = this.rowData[index];
            const move = Math.floor(10 * Math.random()) - 5;
            const newValue = currentRowData.volume + move;
            currentRowData.volume = newValue;
            changes.push(currentRowData);
        }
    };
    MockServer.prototype.makeSomePriceChanges = function (changes) {
        for (let i = 0; i < 10; i++) {
            const index = Math.floor(this.rowData.length * Math.random());
            const currentRowData = this.rowData[index];
            const move = Math.floor(30 * Math.random()) / 10 - 1;
            const newValue = currentRowData.mid + move;
            currentRowData.mid = newValue;
            this.setBidAndAsk(currentRowData);
            changes.push(currentRowData);
        }
    };
    MockServer.prototype.setBidAndAsk = function (dataItem) {
        dataItem.bid = dataItem.mid * 0.98;
        dataItem.ask = dataItem.mid * 1.02;
    };
    return new MockServer();
}