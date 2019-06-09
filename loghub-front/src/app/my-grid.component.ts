import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from './log';
import { PublisherWebService } from './publisher.web.service';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { LogPrimaryKey } from './log-primary-key';




@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})


export class MyGridComponent implements OnInit {

  @ViewChild('agGrid', null) agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  private baseUrl = 'http://localhost:8085/query/';
  public limit = 5;

  //rowData: Observable<Array<Log>>;
  //dbService: PublisherWebService;




  columnDefs = [
    { headerName: 'logId', field: 'key.logId', checkboxSelection: true },
    { headerName: 'ipAddr', field: 'key.ipAddr' },
    { headerName: 'userId', field: 'key.userId', editable: true },
    { headerName: 'record', field: 'record' }
  ];



  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];  


  //rowData: Observable<Log[]>;
  rowData: any;
  getRowNodeId;


  constructor(private http: HttpClient) { 
    this.getRowNodeId = function(data) {
      return data.key.logId;
    };

  }
  ngOnInit(): void {
    //this.dbService = new PublisherWebService(this.baseUrl + this.limit, null);
    //this.rowData = this.dbService.getObservable();
    this.rowData = this.http.get('http://localhost:8085/query/15');
    
    //this.rowData = new PublisherWebService(this.baseUrl + this.limit, null).getObservable();
  }


  updateGrid() {
    // var rowNode = this.gridApi.getRowNode("dcb66ab0-8aef-11e9-b93a-970391a1e8c1");
    // var newPrice = Math.floor(Math.random() * 100000);
    //
      let svc : PublisherWebService = new PublisherWebService(this.baseUrl + 3, null);
      svc.getObservable().subscribe();
      this.gridApi.setRowData(svc.logs);

    //
    // rowNode.setDataValue("key.ipAddr", newPrice);
  }


  onModelUpdated() {
    
    console.log('onModelUpdated()');
  }

  onGridReady(params) {
    console.log('onGridReady() ...');        
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


//    const updates$ = new PublisherWebService(this.baseUrl + 'kafka', null).getObservable();
//    updates$.subscribe(updates => params.api.updateRowData({ update: updates }));

    //params.api.sizeColumnsToFit();


    //let mockServer = createMockServer();
    //let mockServer = new PublisherWebService(this.baseUrl + this.limit, null);
//    this.rowData = mockServer.getObservable();
    console.log('onGridReady() ...');
    //params.api.setRowData(this.rowData);

    //const updates$ = mockServer.byRowupdates();
    // this.rowData.subscribe(data => {
    //      params.api.setRowData(data);
    //     //updates$.subscribe(updates => params.api.updateRowData({ update: updates }));
    // });
  }


  // { headerName: 'logId', field: 'key.logId', checkboxSelection: true },
  // { headerName: 'ipAddr', field: 'key.ipAddr' },
  // { headerName: 'userId', field: 'key.userId', editable: true },
  // { headerName: 'record', field: 'record' }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData: Log[] = selectedNodes.map(node => 
      new Log(new LogPrimaryKey('logpat1', node.data.key.userId, node.data.key.ipAddr, node.data.key.logId), 'DEBUG', node.data.record));
    const selectedDataStringPresentation = selectedData.map(node => 
      node.key.logId + ' ' + node.key.ipAddr + ' ' + node.key.userId + ' ' + node.record).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }


}
