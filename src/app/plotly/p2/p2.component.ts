import { CommonService } from './../../common/common.service';
import { WeatherService } from './../../weather/weather.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-p2',
  templateUrl: './p2.component.html',
  styleUrls: ['./p2.component.css']
})
export class P2Component implements OnInit {
  @ViewChild('chart') el: ElementRef;
  @HostListener('window:resize', ['$event'])


  onResize(event) {
    const element = this.el.nativeElement
    
   Plotly.Plots.resize(element);
  }
 

  constructor(private weatherService:WeatherService , private commonService : CommonService) { }

  ngOnInit() {
    this.commonService.setLoading();
    this.weatherService.getBrunto().subscribe(data => {
      this.topoChart(data)
      this.commonService.stopLoading();
}) ;
  }

  topoChart(data) {
    const element = this.el.nativeElement

    


    const formattedData = [{
               z: data,
               type: 'surface'
            }];

    const layout = {
      title: 'Mt Bruno Elevation in Quebec Canada ',
      autosize: true,
     
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90,
      }
    };

    Plotly.plot(element, formattedData, layout);
  }
}
