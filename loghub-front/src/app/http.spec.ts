import { PublisherWebService } from "./publisher.web.service";
import { Observable, of } from 'rxjs';
import { Log } from './log';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { map, count, scan } from 'rxjs/operators';

// import { CounterComponent } from './counter.component';
// import { PublisherWebService } from './publisher.web.service';

//https://angular.io/guide/testing
//ng test --main .\src\app\logs.component.spec.ts
describe('PublisherWebService service', function () {
  let service: PublisherWebService;
  let fixture: ComponentFixture<PublisherWebService>;

  TestBed.configureTestingModule({
    providers: [PublisherWebService]
  });

  service = new PublisherWebService('http://localhost:8085/query/10', null);

  // let service: PublisherWebService;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [CounterComponent],
  //     providers: [PublisherWebService]
  //   }).compileComponents();

  //   // let counter: CounterComponent;
  //   // service = new PublisherWebService('http://localhost:8085/query/1', counter);
  //})



  it('create server instance', () => {
    let observable: Observable<Array<Log>> = service.getObservable();
    expect(observable).toBeTruthy();
  });


});
