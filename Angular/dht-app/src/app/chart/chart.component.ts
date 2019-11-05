import { Component, OnInit } from '@angular/core';
import { ReadingsService } from '../services/readings.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private temps = [];
  hums = [];
  ts = [];
  dates = [];

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
  constructor(private readings: ReadingsService) {
    this.readings.getTemp().subscribe((data: any[]) =>{
      this.temps = data.slice(-10);
      console.log(this.temps);
      this.dates = this.temps.map(this.datesArray); //Carga un nuevo array con las fechas del array temps
      this.ts = this.temps.map(this.tempsArray);
      
    });
    this.readings.getHum().subscribe((data: any[]) => {
      this.hums = data.slice(-10);
      console.log(this.hums);
    });
  }
  
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels = this.loadDates();
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: this.ts, label: 'Temperature'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  ngOnInit() {
  }

}
