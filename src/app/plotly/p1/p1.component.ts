import { CommonService } from './../../common/common.service';
import {   WeatherService } from './../../weather/weather.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

//import * as _ from 'lodash'


@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.css']
})
export class P1Component implements OnInit {
  @ViewChild('chart') el: ElementRef;
  @ViewChild('chart2') el2: ElementRef;
  @ViewChild('chart3') el3: ElementRef;
  @HostListener('window:resize', ['$event'])


onResize(event) {
  const element = this.el.nativeElement
  const element2 = this.el2.nativeElement
  const element3= this.el3.nativeElement
 Plotly.Plots.resize(element);
 Plotly.Plots.resize(element2);
 Plotly.Plots.resize(element3);
}

 error = false; 
  constructor(private weatherService : WeatherService  ,private commonService : CommonService) { 

   }

   
  ngOnInit() {
   // this.basicChart()
   this.commonService.setLoading();
   this.weatherService.getStock().subscribe(resp=>{
    // console.log (resp)
     this.seriesChart(resp) ;
     this.anichart(resp) ;
     this.commonService.stopLoading();
   })
   this.circularChart(82) ;
  
  }

////////////////////////
  basicChart() {
    const element = this.el.nativeElement

    
    const data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }]

    const style = {
      margin: { t: 0 }
    }

    Plotly.plot( element, data, style )
  }
//////////////////////////
seriesChart(series){
  const element = this.el2.nativeElement;
  var datevals = series['dates'] ;
  var highVals = series['highVals'];
  var lowVals = series['lowvals'];
  var volume = series['volume'];

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'High',
    x: datevals,
    y: highVals ,
    line: {color: '#17BECF'}
  }
  
  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'Low',
    x: datevals,
    y: lowVals,
    line: {color: '#7F7F7F'}
  }
  
  var trace3= {
    type: "bar",
    name: 'Volume',
    x: datevals,
    y: volume,
    line: {color: '#ff0000'},
    yaxis: 'y2',
    opacity: 0.5
  }

  var data = [trace1,trace2 , trace3];
  
  var layout = {
    title: 'Intraday (1min) prices and volumes',
    yaxis: {title: 'Prices',
    titlefont: {color: 'rgb(148, 103, 189)'},
    tickfont: {color: 'rgb(148, 103, 189)'}
  },
    
    yaxis2: {
      title: 'Volume',
      titlefont: {color: 'rgb(255, 0, 0)'},
      tickfont: {color: 'rgb(255,15, 100)'},
      overlaying: 'y',
      side: 'right'
    }
  
  };
  
  Plotly.newPlot(element, data, layout);
  

}
//// animated chart

anichart(series){
  const element = this.el3.nativeElement;
  var frames = []
  var x = series['dates'] ;
  var y = series['highVals'];
  var x2 = series['dates'] ;
  var y2 = series['lowvals'];

  var n = 100;
  for (var i = 0; i < n; i++) {
    frames[i] = {data: [{x: [], y: []}, {x: [], y: []}]}
    frames[i].data[1].x = x.slice(0, i+1);
    frames[i].data[1].y = y.slice(0, i+1);
    frames[i].data[0].x = x2.slice(0, i+1);
    frames[i].data[0].y = y2.slice(0, i+1);
  }

  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'High',
    fill: 'tonexty',
    x: frames[5].data[1].x,
    y: frames[5].data[1].y,
    line: {color: 'grey'}
  }

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'Low',
    x: frames[5].data[0].x,
    y: frames[5].data[0].y,
    line: {color: 'lightgrey'}
  }

  var data = [trace1,trace2];

  var layout = {
    title: 'Stock Prices Filled-Area Animation',
    
    xaxis: {
      range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
      showgrid: false
    },
    yaxis: {
      range: [Math.min.apply(null, series['lowvals']), Math.max.apply(null, series['highVals'])],
      showgrid: false
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      y: 1.2,
      xanchor: 'center'
    },
    updatemenus: [{
      x: 0.5,
      y: 0,
      yanchor: "top",
      xanchor: "center",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: {"t": 87, "r": 10},
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 0,
          },
          frame: {
            duration: 40,
            redraw: false
          }
        }],
        label: "Play"
      }, {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        ],
        label: "Pause"
      }]
    }]
  };

  Plotly.newPlot(element, data, layout).then(function() {
    Plotly.addFrames(element, frames);
  });
 
}

  //////////////////////////// 
  circularChart (level)
{
  const element = this.el.nativeElement
 this.error = false ;

  if( isNaN(level) || level < 0 || level > 180) {
    this.error =  true ;
    return ;
  }
  // Enter a speed between 0 and 180

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
            'Slow', 'Super Slow', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Gauge Speed 0-180',
 
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot(element, data, layout);
}
}
