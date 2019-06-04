import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Log } from './log';

@Injectable({
  providedIn: 'root'
})
export class PublisherWebService {
  private observable = null;
  eventSource: EventSource = null;
  subscriber: Subscriber<Array<Log>> = null;
  logs: Log[];

  constructor(private srvUrl: string) {}

  getObservable(usenew: boolean): Observable<Array<Log>> {
    this.logs = [];
    if (this.observable == null || usenew) {
      this.observable = new Observable(subscriber => {
        try {
          this.subscriber = subscriber;
          this.eventSource = new EventSource(this.srvUrl);

          this.eventSource.onmessage = event => {
            const log = JSON.parse(event.data);
            this.logs.push(new Log(log['key'], log['level'], log['record']));
            this.subscriber.next(this.logs);
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
    }
    return this.observable;
  }

  closeEvenerSource() {
    if (this.eventSource != null) {
      this.eventSource.close;
      this.eventSource = null;
    }
    if (this.subscriber != null) {
      this.subscriber.unsubscribe();
      this.subscriber = null;
    }
  }
}
