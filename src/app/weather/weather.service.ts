import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class WeatherService {



  constructor(private _http: HttpClient) { }

  dailyForecast(city) {
    return this._http.get("https://api.openweathermap.org/data/2.5/forecast?id="+ city + "&APPID=cc7acebf69af6dee8269cdfe914c1915&&units=metric" )
    .map(res=>{
 

      let temp_max = res['list'].map(res => res.main.temp_max);
      let temp_min = res['list'].map(res => res.main.temp_min);
      let alldates = res['list'].map(res => res.dt) ;
      let humidity =  res['list'].map (res=>res.main.humidity);
      let todayWeather = res['list'][0];
      
      
      let weatherDates = []
      alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { month: 'numeric', day: 'numeric' , hour12 : false , hour : 'numeric' , minute : 'numeric'  }))
      })

     let ss= {
        city:res['city'].name ,
        country: res['city'].country ,
        temp_max : temp_max ,
        temp_min : temp_min ,
        humidity : humidity ,
        weatherDates : weatherDates,
        coord:res['city'].coord,
        weather : todayWeather 
     
      }
      //console.log (ss) ;
     return ss ;
     })
  }

///// get only average value for day

dayAvg(list){
  var i = 0 ;

  var weatherDate =""
  


var ssList  = []  ;


  list.forEach((res) => {
    let jsdate = new Date(res.dt * 1000)
let tempdate = jsdate.toLocaleDateString('en', { month: 'numeric', day: 'numeric' });
if (tempdate != weatherDate) { 
  weatherDate = tempdate ;
 ///// new date
 ssList [i] = {
  weatherDate :  tempdate ,
  temp : res.main.temp ,
 }

 i++;
} ///endif

})   // end for each

 

}

/////// service for 3d

getBrunto()
{
 return this._http.get("assets/brunto.json")
 .map (res=>{

  let aa = Object.values(res) ;
var arOfar = [];

 aa.forEach(row=>{
arOfar.push (Object.values(row) )
 })

 //console.log (arOfar)
  return arOfar
 }) ;
 
 
}

//// service for stock realdata
getStock()
{
   /// alphavantage key  R28IQRBZL3Q4DS1S 
  return this._http.get ("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=R28IQRBZL3Q4DS1S")
  // this._http.get("assets/stock.json" )
  // 

  .map(res=> {
//console.log (res)
    let dates= Object.keys (res['Time Series (1min)'])   ;
    let highVals = Object.values (res['Time Series (1min)']).map(res => res['2. high']  );
    let lowvals =  Object.values (res['Time Series (1min)']).map(res => res['3. low']  );
    let volume =  Object.values (res['Time Series (1min)']).map(res => res['5. volume']  );
    volume[0] = volume[1]  ;
    
var ss={
  dates : dates,
  highVals : highVals ,
  lowvals : lowvals,
  volume : volume
}
return ss ;  
  })
  

}

 


/////////////////////////////////
}
