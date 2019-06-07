import { CounterComponent } from './counter.component';
import { PublisherWebService } from './publisher.web.service';
//https://angular.io/guide/testing
//ng test --main .\src\app\logs.component.spec.ts
describe('PublisherWebService', () => {
  let service: PublisherWebService;
  let counter: CounterComponent;
  beforeEach(() => {
    service = new PublisherWebService('http://localhost:8085/10', counter);
  });


  it('#getObservableValue should return value from observable', (done: DoneFn) => {
    service.getObservable().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });

  it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
      done();
    });
  });
});
