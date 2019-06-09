
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store} from '@ngrx/store';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create 1111', async(() => {
    expect(component).toBeTruthy();
  }));
});
