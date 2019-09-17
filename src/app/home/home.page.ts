import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private highChart: any;
  private sampleData: Observable<any>;

  constructor(private authService: AuthService, 
              private firebaseService: FirebaseService) {}

  ionViewDidEnter() {
    this.plotDynamicSplineChart();

    this.authService.doLogin().then(result => {
      this.sampleData = this.firebaseService.getSampleData();
      console.log(result);
      this.sampleData.subscribe(tempArray => {
        console.log(tempArray);
        const _date = new Date().getTime();
        const _temp = tempArray[0].temperature;
        const _humidity = tempArray[0].humidity;
        this.highChart.series[0].addPoint([_date, _temp], true, true);
        this.highChart.series[1].addPoint([_date, _humidity], true, true);
      });
    });
  }

  plotDynamicSplineChart() {
     this.highChart = HighCharts.chart('dynamicSpline', {
      chart: {
        type: 'spline',
        animation: true, // don't animate in old IE
        marginRight: 10
      },

      time: {
        useUTC: false
      },

      title: {
        text: 'Monitor Temperature/Humidity'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: ''
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Temperature',
        type: undefined,
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -14; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: 74+ 2*Math.random()
            });
          }
          return data;
        }())
      }, {
        name: 'Humidity',
        type: undefined,
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -14; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: 62+4*Math.random()
            });
          }
          return data;
        }())
      }]

    });
  }

}

