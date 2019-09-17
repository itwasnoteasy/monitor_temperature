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

  private tempReadings: any;
  private highChart: any;
  private readTemperature: Observable<any>;
  private sampleData: Observable<any>;

  constructor(private authService: AuthService, 
              private firebaseService: FirebaseService) {}

  ionViewDidEnter() {
    // this.authService.doLogin().then(result => {
    //   this.readTemperature = this.firebaseService.readTemperature();
    //   console.log(result);
    //   this.readTemperature.subscribe(tempArray => {
    //     console.log(tempArray);
    //     const x = tempArray[0].created_ts;
    //     const y = tempArray[0].value;
    //     this.highChart.series[0].addPoint([x.seconds * 1000, y], true, true);
    //   });
    // });
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
        marginRight: 10,
        // events: {
        //   load: function () {
        //     // set up the updating of the chart each second
        //     let series = this.series[0];
        //     let humiditySeries = this.series[1];
        //     setInterval(function () {
        //       var x = (new Date()).getTime(), // current time
        //         y = 22+2*Math.random(),
        //         z = 64+4*Math.random();
        //       series.addPoint([x, y], true, true);
        //       humiditySeries.addPoint([x, z], true , true);
        //     }, 2000);
        //   }
        // }
      },

      time: {
        useUTC: false
      },

      title: {
        text: 'Live Temperature'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Temperature'
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

