import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogsComponent } from './logs.component';
import { PublisherWebService } from './publisher.web.service';

@NgModule({
    declarations: [
        AppComponent,
        LogsComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        PublisherWebService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
