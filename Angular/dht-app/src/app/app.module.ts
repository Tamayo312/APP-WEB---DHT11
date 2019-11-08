import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { RealtimeComponent } from './realtime/realtime.component';
import { Realtime2Component } from './realtime2/realtime2.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RealtimeComponent,
    Realtime2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
