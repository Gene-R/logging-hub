import { Component, OnInit } from '@angular/core';
import { interval, Observable, Observer, concat, merge, forkJoin } from 'rxjs';
import { distinctUntilChanged, map, scan } from 'rxjs/operators';
import { Log } from './log';
import { PublisherWebService } from './publisher.web.service';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  providers: [PublisherWebService, CounterComponent]
})
export class LogsComponent implements OnInit {
  private baseUrl = 'http://localhost:8085/query/';
  public limit = 3;

  public selectedLog: Log;
  kafkaStream: Observable<Array<Log>>;
  dbStream: Observable<Array<Log>>;

  constructor(public counter: CounterComponent) {}

  kafkaService: PublisherWebService = new PublisherWebService(
    this.baseUrl + 'kafka',
    this.counter
  );
  dbService: PublisherWebService = new PublisherWebService(
    this.baseUrl + this.limit,
    this.counter
  );

  rndStream: Observable<number> = interval(200).pipe(
    scan((a, c) => [...a, c], []),
    map(r => r[Math.floor(Math.random() * r.length)]),
    distinctUntilChanged()
  );

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });


  onSelect(log: Log): void {
    this.selectedLog = log;
    console.log('Selected log: ' + log);
  }

  ngOnInit(): void {
    console.log('ngOnInit() is called');
    this.kafkaStream = this.kafkaService.getObservable(false);
    // this.kafkaStream = this.dbService.getObservable(true);
  }

  mergeStreams(): void {
    this.dbStream = this.dbService.getObservable(true);
    this.kafkaStream = merge(this.kafkaStream, this.dbStream);
    this.counter.increment();
  }

  public getLogsStream() {
    return this.kafkaStream;
  }
}
