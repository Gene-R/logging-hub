import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Log } from './log';
import { CounterComponent } from './counter.component';

@Injectable({
  providedIn: 'root'
})
export class PublisherWebService {
  private observable = null;
  eventSource: EventSource = null;
  subscriber: Subscriber<Array<Log>> = null;
  logs: Log[];

  constructor(private srvUrl: string, private counter: CounterComponent) { }

  getObservable(): Observable<Array<Log>> {
    this.logs = [];
    this.observable = new Observable(subscriber => {
      try {
        this.subscriber = subscriber;
        this.eventSource = new EventSource(this.srvUrl);

        this.eventSource.onmessage = event => {
          if (this.counter != null) {
            this.counter.increment(); // each processed message should increase app global counter in the store
          }
          const log = JSON.parse(event.data);
          let l: Log = new Log(log.key, log.level, log.record);
          this.logs.push(l);
          this.subscriber.next(this.logs);
          console.log('getObservable: ' + l);
        };


        this.eventSource.onerror = err => {
          switch (this.eventSource.readyState) {
            case 0:
              this.eventSource.close();
              this.eventSource = null;
              subscriber.complete();
              break;
            default:
              subscriber.error('EventSource error: ' + err);
              console.log('EventSource error: ', err);
          }
        };



      } catch (err) {
        console.log.apply('Could not get observable: ' + err);
      }
    });

    return this.observable;
  }

  closeEvenerSource() {
    if (this.eventSource != null) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.subscriber != null) {
      this.subscriber.unsubscribe();
      this.subscriber = null;
    }
  }
}
