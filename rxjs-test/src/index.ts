import { interval, Observable, Observer } from 'rxjs';
import { distinctUntilChanged, map, scan, tap } from 'rxjs/operators';

var fixedStream = Observable.create((observer: any) => {
  for(let i=0; i < 5; i++){
    observer.next("i = " + i);
  }
  observer.complete();
});

fixedStream.subscribe(
  (msg: any) => msgHandler(msg),
  (error: any) => msgHandler('Error: ' + error),
  () => msgHandler('Closed')
);

function msgHandler(val: any) {
  var node = document.createElement('li');
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('tbl').appendChild(node);
}

var stream1: Observable<number> = interval(200).pipe(
  scan((a, c) => [...a, c], []),
  map(r => r[Math.floor(Math.random() * r.length)]),
  distinctUntilChanged()
);

var stream2 = new Observable<Date>((observer: Observer<Date>) => {
  setInterval(() => observer.next(new Date()), 1000);
});


var stream3 = stream2.pipe( // transform stream with Date objects to the stream of longs 
  map(val => val.getTime())
  );
//   tap({ //  to generate log data on next(), error() and complete()
//     next: (val: any) => {
//       console.log('on next', val);
//     },
//     error: (error: any) => {
//       console.log('on error', error.message);
//     },
//     complete: () => console.log('on complete')
//   })
// );


function showStream(stream: Observable<any>, tag: string){
  stream.subscribe((val: any) => {
    var div = document.getElementById(tag);
    div.innerHTML = val;
  });
}

showStream(stream1, 'randomN');
showStream(stream2, 'timestamp1');
showStream(stream3, 'timestamp2');
