import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  constructor(private http:HttpClient) { }
  getTemp(){
    const urlServer = "http://localhost:8080";
    return this.http.get(urlServer + "/api/temperatura")
    .pipe(map((response: any) => response.temperatura));
  }
  getHum(){
    const urlServer = "http://localhost:8080";
    return this.http.get(urlServer + "/api/humedad")
    .pipe(map((response: any) => response.humedad));
  }
}
