import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

 votes={
  Firefox :8,
  Chrome:60,
  Safari:16,
  Edge : 8,
  Opera:3
  
 } 

 browsers ={
  firefox : 10,
  chrome:20,
  safari:18,
   edge : 5,
  opera:8
 
}


chart ;
chart2  ;
chart3 ;

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }


 drawChart(){

  var densityData = {
    label : "current users Votes" ,
    data:Object.values( this.browsers) ,
    backgroundColor: [ "rgb(255, 190, 0)" ,"rgb(22, 160, 94)","rgb(160, 38, 231)","rgb(47, 44, 211)","rgb(209, 59, 59)"],
    }  
    
   var votesdata = {
    label : "2018 users votes " ,
    data:Object.values( this.votes) ,
    backgroundColor: [ "rgb(255, 190, 0, 0.5)", "rgb(22, 160, 94, 0.5)", "rgb(160, 38, 231, 0.5)" ,"rgb(47, 44, 211, 0.5)","rgb(209, 59, 59, 0.5)" ],
   } 
  this.chart = new Chart('canvas', {
    type: 'horizontalBar',
    data: {
      labels: Object.keys( this.votes),
      datasets: [{
        label : "current users Votes" ,
        data:Object.values( this.browsers) ,
        backgroundColor: [ "rgb(255, 190, 0)" ,"rgb(22, 160, 94)","rgb(160, 38, 231)","rgb(47, 44, 211)","rgb(209, 59, 59)"],
        }  
        , votesdata] , 
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
  });

  //// pie chart
  this.chart2 = new Chart('canvas2', {
    type: 'pie',
    data: {
      labels: Object.keys( this.votes),
      datasets: [{
        label : "current users Votes" ,
        data:Object.values( this.browsers) ,
        backgroundColor: [ "rgb(255, 190, 0)" ,"rgb(22, 160, 94)","rgb(160, 38, 231)","rgb(47, 44, 211)","rgb(209, 59, 59)"],
        }   ] , 
    },
    options: {
      legend: {
        display: true
      },
      
    }
  });

/// polar area chart
this.chart3 = new Chart('canvas3', {
  type: 'polarArea',
  data: {
    labels: Object.keys( this.votes),
    datasets: [{
      label : "current users Votes" ,
      data:Object.values( this.browsers) ,
      backgroundColor: [ "rgb(255, 190, 0)" ,"rgb(22, 160, 94)","rgb(160, 38, 231)","rgb(47, 44, 211)","rgb(209, 59, 59)"],
      }   ] , 
  },
  options: {
    legend: {
      display: true
    },
    
  }
});
  
 }

    
  incBrowser (bro)
  {
     
this.browsers[bro] = this.browsers[bro] + 1;
//this.drawChart();

this.chart.data.datasets[0].data =  Object.values( this.browsers) ;
 this.chart.update();

 this.chart2.data.datasets[0].data =  Object.values( this.browsers) ;
 this.chart2.update();

 this.chart3.data.datasets[0].data =  Object.values( this.browsers) ;
 this.chart3.update();

  }

  decBrowser (bro)
  {
    if (this.browsers[bro] > 0) {
   this.browsers[bro] = this.browsers[bro] - 1;

   this.chart.data.datasets[0].data =  Object.values( this.browsers) ;
 this.chart.update();

   this.chart2.data.datasets[0].data =  Object.values( this.browsers) ;
   this.chart2.update(); 

   this.chart3.data.datasets[0].data =  Object.values( this.browsers) ;
   this.chart3.update();
   
    }

  }
}
