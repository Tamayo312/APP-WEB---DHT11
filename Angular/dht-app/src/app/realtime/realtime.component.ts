import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {

  private intervalUpdate: any = null;
  public chart: any = null;
  private chart2: any = null;

  private showData() : void {
    this.getReadings().subscribe(response => {
        let chartTime: any = new Date();
        chartTime = chartTime.getHours() + ':' + 
          ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + 
          ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
        this.chart.data.labels.push(chartTime);
        if(this.chart.data.labels.length > 10) {
          this.chart.data.labels.shift();
          this.chart.data.datasets[0].data.shift();
        }
        console.log(response[response.length-1].temperatura);
        this.chart.data.datasets[0].data.push(response[response.length-1].temperatura);
        this.chart.update();
    }, error => {
     console.error("ERROR: Unexpected response");
    });
  }

  private getReadings(): Observable<any>{
    const urlServer = "http://localhost:8080";
    return this.http.get(urlServer + "/api/temperatura")
    .pipe(map((response: any) => response.temperatura));
  }

  constructor(private http: HttpClient) { }

  ngOnInit() : void {
    this.intervalUpdate = setInterval(function(){
      this.showData();
    }.bind(this), 2500);
    this.chart = new Chart('realtime', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Data',
        fill: false,
        data: [],
        backgroundColor: '#de1631',
        borderColor: '#de1631'
        }
       ]
        },
        options: {
       tooltips: {
        enabled: false
       },
       legend: {
        display: false,
        position: 'bottom',
        labels: {
         fontColor: 'white'
        }
       },
       scales: {
         yAxes: [{
          ticks: {
           fontColor: "white"
          }
         }],
         xAxes: [{
        ticks: {
         fontColor: "white",
         beginAtZero: true
        }
         }]
       }
        }
     });
  }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
   }
}
