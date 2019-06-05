import { interval, Observable, Observer, of, merge, concat, zip, timer } from "rxjs";
import {
  distinctUntilChanged,
  map,
  scan,
  flatMap,
  buffer,
  max,
  min,
  mergeAll,
  tap,
  delay,
  sample
} from "rxjs/operators";
import { join } from "path";

// var fixedStream1 = of(1,2,3,4).pipe(map(n => 'k=' + n));
// var fixedStream2 = of(100,200,300,400).pipe(map(n => 'k=' + n));

var fixedStream1 = of(1, 2, 3, 4, 5, 6);
var fixedStream2 = fixedStream1.pipe(map(n => n*100)); // new stream created by transforming of another stream

var randomStream: Observable<number> = interval(100).pipe(
  scan((a, c) => [...a, c], []),
  //map(r => r[Math.floor(Math.random() * r.length)]),
  map(r => Math.random() ),  
  distinctUntilChanged()
);

var dateStream = new Observable<number>((observer: Observer<number>) => {
  setInterval(() => observer.next(new Date().getTime()), 100);
});

var longStream = dateStream.pipe(
  // transform stream with Date objects to the stream of longs
  map(val => new Date( val ), sample(interval(5000)) )
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

// async function asyncFunc(arg: string) {
//   setTimeout(function() {
//     console.log("asyncFunc(" + arg + ") starts");
//     }, 5000);

//   return 'Result for ' + arg.toLowerCase();
// }

// var promise1 = asyncFunc("AAA");
// var promise2 = asyncFunc("BBB");
// var promise3 = asyncFunc("CCC");

// promise1.then(result => console.log(result));
// promise2.then(result => console.log(result));
// promise3.then(result => console.log(result));

function asyncTask(i: number) {
  return new Promise(resolve => resolve(i + 1));
}
async function runAsyncTasks() {
  const res1 = await asyncTask(99);
  console.log('await asyncTask(99)');
  const res2 = await asyncTask(101);
  console.log('await asyncTask(101)');
  const res3 = await asyncTask(202);
  console.log('await asyncTask(202)');
  return "runAsyncTasks completed all internal async tasks with await keyword";
}

runAsyncTasks().then(result => console.log("FFF=" + result));

var mixedStream3 = zip(fixedStream1, fixedStream2).pipe(
  mergeAll(),
  scan((acc, curVal) => acc + curVal)
);


function showStream(stream: Observable<any>, tag: string) {
  stream.subscribe((val: any) => {
    var div = document.getElementById(tag);
    div.innerHTML = val;
  });
}

showStream(randomStream, "randomN");
showStream(dateStream, "timestamp1");
showStream(longStream, "timestamp2");

var count=0;
mixedStream3.subscribe((val: any) => {
  var row = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var tsId = 'ts' + count++;
  td2.setAttribute('id',tsId);
  
  var cell1 = document.createTextNode(val);
  var cell2 = document.createTextNode("Please wait ...");
  td1.appendChild(cell1);
  td2.appendChild(cell2);
  row.appendChild(td1);
  row.appendChild(td2);
  document.getElementById("tbl").appendChild(row);
  showStream(longStream, tsId);  
});

