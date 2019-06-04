(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h2>\n    app: {{ title }}\n  </h2>\n</div>\n<app-logs></app-logs>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/logs.component.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/logs.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div>\n        <div>Current time: {{ time | async }}</div>\n        <div>Random events: {{ rndStream | async | json }}</div>\n        <button class=\"button\" (click)=\"connect2database()\">Database</button>\n        <button class=\"button\" (click)=\"connect2kafka()\">Kafka</button>\n\n        <div>\n            <label>Selected log: </label>{{selectedLog| json}}\n        </div>\n\n        <table id=\"logs\">\n            <colgroup>\n                <col style=\"width:30%\">\n                <col style=\"width:10%\">\n                <col style=\"width:60%\">\n            </colgroup>\n            <thead>\n                <tr>\n                    <th>Log Key</th>\n                    <th>Src IP addr</th>\n                    <th>User ID</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let log of observLogs | async\" [class.success]=\"log === selectedLog\"\n                    (click)=\"onSelect(log)\">\n                    <td>{{log.key.logId}}</td>\n                    <td>{{log.key.ipAddr}}</td>\n                    <td>{{log.key.userId}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n</div>"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'loghub-front';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _logs_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logs.component */ "./src/app/logs.component.ts");
/* harmony import */ var _publisher_web_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./publisher.web.service */ "./src/app/publisher.web.service.ts");






let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            _logs_component__WEBPACK_IMPORTED_MODULE_4__["LogsComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
        ],
        providers: [
            _publisher_web_service__WEBPACK_IMPORTED_MODULE_5__["PublisherWebService"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/log.ts":
/*!************************!*\
  !*** ./src/app/log.ts ***!
  \************************/
/*! exports provided: Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
class Log {
    constructor(key, level, record) {
        this.key = key;
        this.level = level;
        this.record = record;
    }
}


/***/ }),

/***/ "./src/app/logs.component.css":
/*!************************************!*\
  !*** ./src/app/logs.component.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.button {\n  width: 100px;\n  margin: 5px;\n}\n\n#logs {\n  font-family: \"Trebuchet MS\", Arial, Helvetica, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n#logs td, #logs th {\n  border: 1px solid #ddd;\n  padding: 8px;\n  cursor: crosshair;\n}\n\n#logs tr:nth-child(even) {\n  background-color: #f2f2f2;\n}\n\n#logs tr:hover {\n  background-color: #dd0;\n}\n\n#logs th {\n  padding-top: 12px;\n  padding-bottom: 12px;\n  text-align: left;\n  background-color: #4CAF50;\n  color: white;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9ncy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSx5REFBeUQ7RUFDekQseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZCIsImZpbGUiOiJzcmMvYXBwL2xvZ3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmJ1dHRvbiB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWFyZ2luOiA1cHg7XG59XG5cbiNsb2dzIHtcbiAgZm9udC1mYW1pbHk6IFwiVHJlYnVjaGV0IE1TXCIsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jbG9ncyB0ZCwgI2xvZ3MgdGgge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiA4cHg7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG4jbG9ncyB0cjpudGgtY2hpbGQoZXZlbikge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xufVxuXG4jbG9ncyB0cjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkZDA7XG59XG5cbiNsb2dzIHRoIHtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/logs.component.ts":
/*!***********************************!*\
  !*** ./src/app/logs.component.ts ***!
  \***********************************/
/*! exports provided: LogsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsComponent", function() { return LogsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _publisher_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./publisher.web.service */ "./src/app/publisher.web.service.ts");





let LogsComponent = class LogsComponent {
    constructor() {
        this.baseUrl = "http://localhost:8085/query/";
        this.limit = 30;
        this.dbConnected = false;
        this.kafkaConnected = false;
        this.kafkaService = new _publisher_web_service__WEBPACK_IMPORTED_MODULE_4__["PublisherWebService"](this.baseUrl + "kafka");
        this.dbService = new _publisher_web_service__WEBPACK_IMPORTED_MODULE_4__["PublisherWebService"](this.baseUrl + this.limit);
        this.rndStream = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(200).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])((a, c) => [...a, c], []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(r => r[Math.floor(Math.random() * r.length)]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        this.time = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((observer) => {
            setInterval(() => observer.next(new Date().toString()), 1000);
        });
    }
    connect2database() {
        if (!this.dbConnected) {
            this.observLogs = this.dbService.getPproducer(this.limit);
            this.dbConnected = true;
        }
        else {
            this.dbService.closeEvenerSource();
            this.dbConnected = false;
            this.connect2database();
        }
    }
    connect2kafka() {
        if (!this.kafkaConnected) {
            this.observLogs = this.kafkaService.getPproducer(this.limit);
            this.kafkaConnected = true;
        }
        else {
            this.kafkaService.closeEvenerSource();
            this.kafkaConnected = false;
            this.connect2kafka();
        }
    }
    onSelect(log) {
        this.selectedLog = log;
        console.log("Selected log: " + log);
    }
};
LogsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-logs",
        template: __webpack_require__(/*! raw-loader!./logs.component.html */ "./node_modules/raw-loader/index.js!./src/app/logs.component.html"),
        providers: [_publisher_web_service__WEBPACK_IMPORTED_MODULE_4__["PublisherWebService"]],
        styles: [__webpack_require__(/*! ./logs.component.css */ "./src/app/logs.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], LogsComponent);



/***/ }),

/***/ "./src/app/publisher.web.service.ts":
/*!******************************************!*\
  !*** ./src/app/publisher.web.service.ts ***!
  \******************************************/
/*! exports provided: PublisherWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublisherWebService", function() { return PublisherWebService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./log */ "./src/app/log.ts");




let PublisherWebService = class PublisherWebService {
    constructor(srvUrl) {
        this.srvUrl = srvUrl;
        this.eventSource = null;
        this.subscriber = null;
    }
    getPproducer(limit) {
        this.logs = [];
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((subscriber) => {
            try {
                this.subscriber = subscriber;
                this.eventSource = new EventSource(this.srvUrl);
                this.eventSource.onmessage = (event) => {
                    const log = JSON.parse(event.data);
                    this.logs.push(new _log__WEBPACK_IMPORTED_MODULE_3__["Log"](log['key'], log['level'], log['record']));
                    this.subscriber.next(this.logs);
                };
                this.eventSource.onerror = (err) => {
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
            }
            catch (err) {
                console.log.apply('Could not get observable: ' + err);
            }
        });
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
};
PublisherWebService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
], PublisherWebService);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\JAVA\eclipse-workspace2\logging-hub\loghub-front\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map