import { Component, OnInit } from '@angular/core';
import { ReadingsService } from '../services/readings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  temp;
  hum;
  interval;
  data;

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 
    }, 2500);
  }

  refreshData(){
    this.readings.getTemp().subscribe((data: any[]) => {
      this.temp = data[data.length-1].temperatura;
    });
    this.readings.getHum().subscribe((data: any[]) => {
      this.hum = data[data.length-1].humedad;
    });
  }
  constructor(private readings: ReadingsService) {
    this.readings.getTemp().subscribe((data: any[]) => {
      this.temp = data[data.length-1].temperatura;
    });
    
    this.readings.getHum().subscribe((data: any[]) => {
      this.hum = data[data.length-1].humedad;
    });
    
  }
}
