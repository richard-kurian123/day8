import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getOne():Observable<any>{
    return this.http.get('/assets/data1.json');
  }

  secondApi(){
    return this.http.get('/assets/data2.json');
  }

}
