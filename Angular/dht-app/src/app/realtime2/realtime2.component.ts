import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-realtime2',
  templateUrl: './realtime2.component.html',
  styleUrls: ['./realtime2.component.css']
})
export class Realtime2Component implements OnInit {

  private intervalUpdate: any = null;
  public chart: any = null;
  private chart2: any = null;

  private showData(): void {
    this.getReadings2().subscribe(response => {
      let chartTime: any = new Date();
      chartTime = chartTime.getHours() + ':' + 
        ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + 
        ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
      this.chart2.data.labels.push(chartTime);
      if(this.chart2.data.labels.length > 10) {
        this.chart2.data.labels.shift();
        this.chart2.data.datasets[0].data.shift();
      }
      console.log(response[response.length-1].humedad);
      this.chart2.data.datasets[0].data.push(response[response.length-1].humedad);
      this.chart2.update();
  }, error => {
   console.error("ERROR: Unexpected response");
  });
  }

  private getReadings2(): Observable<any>{
    const urlServer = "http://localhost:8080";
    return this.http.get(urlServer + "/api/humedad")
    .pipe(map((response: any) => response.humedad));
  }

  constructor(private http: HttpClient) { }

  ngOnInit() : void {
    this.intervalUpdate = setInterval(function(){
      this.showData();
    }.bind(this), 2500);
     this.chart2 = new Chart('realtime2', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Data',
        fill: false,
        data: [],
        backgroundColor: '#168ede',
        borderColor: '#168ede'
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
