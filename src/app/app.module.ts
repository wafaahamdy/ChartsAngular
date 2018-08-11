 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core'; 

import { AppComponent } from './app.component';
import { WeatherService } from './weather/weather.service';
import { ShowComponent } from './weather/show/show.component';
import { HttpClientModule   } from '../../node_modules/@angular/common/http';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { CommonService } from './common/common.service';
import { ChartsComponent } from './charts/charts.component';
import { P1Component } from './plotly/p1/p1.component';
import { FormsModule } from '@angular/forms';
import { P2Component } from './plotly/p2/p2.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    SideBarComponent,
    SpinnerComponent,
    ChartsComponent,
    P1Component,
    P2Component,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    FormsModule ,
    AgmCoreModule.forRoot({
      apiKey:     'AIzaSyCY3_mBmt20jbz0kM9bLnGkiNEtoLmc90c'  //'AIzaSyA6l0x187MOOj8bnzz2ZmGFvoz7cjNnz_M'// 'AIzaSyCsRb5bAKAvj749V2kueNC1gMqRazI1BXg'
    }),
    AngularFontAwesomeModule,
    RouterModule.forRoot([
         { path: '', component: ShowComponent },
         { path: 'charts', component: ChartsComponent },
         { path: 'plotly1', component: P1Component },
         { path: '3dCharts', component: P2Component }
      
    ])
  ],
  providers: [
    CommonService ,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
