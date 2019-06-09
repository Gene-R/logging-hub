import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';
import { LogsComponent } from './logs.component';
import { Store } from '@ngrx/store';


describe('AppComponent', () => {

  counter: CounterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LogsComponent,
        CounterComponent
      ],
    }).compileComponents();
  }));


  // it('should create the app (app component)', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'app: loghub-front'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app: loghub-front');
  // });

  // it('should render title in a h2 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h2').textContent).toContain('app: loghub-front');
  // });


});
