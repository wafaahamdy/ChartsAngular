import { CommonService } from './../../common/common.service';
import { WeatherService } from './../weather.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit , OnDestroy {
 
  chart  : any[] ;
  chart2 :any[] ;
 
  chartSubs : Subscription ;
   cityData = {
   city : '' ,
   country : "" ,
   coord : "",
   weather:[]
  }
///// for map

 

  constructor(private weatherService : WeatherService , private commonService : CommonService) { }

  ngOnInit() {
    this.drawChart ("360630") ; /// default value for city code set to Cairo

  }// end on|INt functrion


  ngOnDestroy(): void {
    this.chartSubs.unsubscribe() ;
  }


  ////////////
  setCity(code){
  //  console.log (code)
    this.drawChart (code)
  }

  drawChart (code){
    this.commonService.setLoading() ;
    this.chartSubs = this.weatherService.dailyForecast(code).subscribe(res=>{
    this.commonService.stopLoading () ; 
    //// show city data
    this.cityData = {
      city : res.city ,
      country : res.country,
      coord: res.coord,
      weather : res.weather 
     }

    ///// draw line chart
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: res.weatherDates,
        datasets: [
          { 
            data: res.temp_max,
            borderColor: "#3cba9f",
            fill: false,
            label : "Temp"
          },
   /*       { 
            data: res.temp_min,
            borderColor: "#ffcc00",
            fill: '-1' ,
            label : "Min temp"
          },*/
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    }) ;

    ////// draw bar humidity chart
//console.log (res.humidity )

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels:res.weatherDates ,
        datasets: [
          {
            label: "Humidity",
            backgroundColor: "#3e95cd",
            data:  res.humidity 
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Humidity Levels '
        }
      }
      }) ;



      }, ///end resp    
    (error=>{ 
      console.log (error) ;
      this.commonService.stopLoading () ;  
    }) ///end error
    ) // end subscribe
  }



}  /// end class
