import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from './log';
import { PublisherWebService } from './publisher.web.service';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { LogPrimaryKey } from './log-primary-key';
import { RowNode } from 'ag-grid-community';
import { MyInputComponent } from './my-input.component';




@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})


export class MyGridComponent implements OnInit {

  @ViewChild('agGrid', null) agGrid: AgGridAngular;
  @ViewChild(MyInputComponent,null) limit: MyInputComponent;
  loadInProgress:boolean = false;


  private gridApi;
  private gridColumnApi;

  


  private baseUrl = 'http://localhost:8085/query/';

  columnDefs = [
    { headerName: 'logId', field: 'key.logId', checkboxSelection: true },
    { headerName: 'ipAddr', field: 'key.ipAddr' },
    { headerName: 'userId', field: 'key.userId', editable: true },
    { headerName: 'record', field: 'record' }
  ];

  defaultColDef = {
    editable: true,
    resizable: true
  };

  //////////////////

  logs: Array<Log> = [];
  
  getRowNodeId = function (data) {
    return data.key.logId;
  };


  //constructor(private http: HttpClient) {}
  
  ngOnInit(): void {}


  resetGrid() {
    this.logs = [];
    this.gridApi.setRowData(this.logs);
  }

  updateGrid() {
    // var rowNode = this.gridApi.getRowNode("dcb66ab0-8aef-11e9-b93a-970391a1e8c1");
    // var newPrice = Math.floor(Math.random() * 100000);

    let observable = new Observable(subscriber => {
      this.loadInProgress = true;
      let eventSource = new EventSource(this.baseUrl + this.limit.inData);

      eventSource.onmessage = event => {
        const log = JSON.parse(event.data);
        let l: Log = new Log(log.key, log.level, log.record);
        this.logs.push(l);
        subscriber.next(this.logs);
        console.log('getObservable: ' + l);
        this.gridApi.setRowData(this.logs);
      };

      eventSource.onerror = err => {
        switch (eventSource.readyState) {
          case 0:
            eventSource.close();
            subscriber.complete();
            this.loadInProgress = false;
            break;
          default:
            subscriber.error('EventSource error: ' + err);
            console.log('EventSource error: ', err);
            this.loadInProgress = false;
        }
      }
    });

    observable.subscribe();
  }

  onModelUpdated() {
    console.log('onModelUpdated()');
  }

  onGridReady(params) {
    console.log('onGridReady() ...');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log('onGridReady() ...');

  }
  getSelectedRows() {
    const selNodes: RowNode[] = this.agGrid.api.getSelectedNodes();
    const selLogs: Log[] = selNodes.map(node =>
      new Log(new LogPrimaryKey('logpat1', node.data.key.userId, node.data.key.ipAddr, node.data.key.logId), 'DEBUG', node.data.record));
    const selectedDataStringPresentation = selLogs.map(node =>
      node.key.logId + ' ' + node.key.ipAddr + ' ' + node.key.userId + ' ' + node.record).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }


}
