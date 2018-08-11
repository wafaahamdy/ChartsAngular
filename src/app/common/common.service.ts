import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  loading : boolean = false ;

  constructor() { }

  setLoading(){
    this.loading = true ;
  }

  stopLoading(){
    this.loading = false ;
  }
  
}
