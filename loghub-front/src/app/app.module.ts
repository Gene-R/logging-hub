import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { counterReducer } from './counter.reducer';

import { AppComponent } from './app.component';
import { LogsComponent } from './logs.component';
import { PublisherWebService } from './publisher.web.service';
import { CounterComponent } from './counter.component';

@NgModule({
    declarations: [
        AppComponent,
        LogsComponent,
        CounterComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({ count: counterReducer })
    ],
    providers: [
        PublisherWebService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
