import { Component, OnInit } from '@angular/core';
import { ReadingsService } from '../services/readings.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  temps = [];
  hums = [];
  ts = [];
  hs = [];
  dates = [];
  interval;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];

  datesArray(item){
    var date = item.date; //string
    return date;
  }
  loadDates(){
    this.dates = this.temps.map(this.datesArray);
    console.log(this.dates);
    return this.dates;
  }
  tempsArray(item){
    var temp = item.temperatura;
    return temp;
  }
  humsArray(item){
    var hum = item.humedad;
    return hum;
  }
  constructor(private readings: ReadingsService) {
    this.readings.getTemp().subscribe((data: any[]) =>{
      this.temps = data.slice(-10);
      this.dates = this.temps.map(this.datesArray); //Carga un nuevo array con las fechas del array temps
      this.barChartLabels = this.dates;
      this.ts = this.temps.map(this.tempsArray);
      this.readings.getHum().subscribe((data: any[]) => {
        this.hums = data.slice(-10);
        this.hs = this.hums.map(this.humsArray);
        this.barChartData = [{data: this.ts, label: 'Temperature'}, {data: this.hs, label: 'Humidity'}];
      });
    });
  }

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 
    }, 2500);
  }
  refreshData(){
    this.readings.getTemp().subscribe((data: any[]) =>{
      this.temps = data.slice(-10);
      this.dates = this.temps.map(this.datesArray); //Carga un nuevo array con las fechas del array temps
      this.barChartLabels = this.dates;
      this.ts = this.temps.map(this.tempsArray);
      this.readings.getHum().subscribe((data: any[]) => {
        this.hums = data.slice(-10);
        this.hs = this.hums.map(this.humsArray);
        this.barChartData = [{data: this.ts, label: 'Temperature'}, {data: this.hs, label: 'Humidity'}];
      });
    });
  }

}
