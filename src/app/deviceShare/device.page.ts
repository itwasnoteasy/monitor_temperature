import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device',
  templateUrl: 'device.page.html',
  styleUrls: ['device.page.scss'],
})
export class DevicePage {
  private deviceAnalysisData: Observable<any>;
  private categories = [];
  private category1Hours = [];
  private category1Data = [];
  private category2Data = [];
  private category3Hours = [];
  private category3Data = [];
  private category4Hours = [];
  private category4Data = [];
  private category5Hours = [];
  private category5Data = [];
  private applianceData = [];

  constructor(private authService: AuthService, 
    private firebaseService: FirebaseService) {}

  ionViewDidEnter() {
    this.authService.doLogin().then(result => {
      this.deviceAnalysisData = this.firebaseService.getDeviceAnalysisData();
      console.log(result);
      this.deviceAnalysisData.subscribe(deviceData => {
        this.categories = deviceData[0];
        this.category1Hours = deviceData[1];
        this.category1Data = deviceData[2];
        this.category2Data = deviceData[3];
        this.category3Hours = deviceData[4];
        this.category3Data = deviceData[5];
        this.category4Hours = deviceData[6];
        this.category4Data = deviceData[7];
        this.category5Hours = deviceData[8];
        this.category5Data = deviceData[9];
        this.applianceData = deviceData[10];
        this.plotSimpleDonutChart();
        this.plotSemiDonutChart();
      });
    });
  }

  plotSimpleDonutChart() {
    var colors = HighCharts.getOptions().colors,
      categories = this.categories,
      data = [
        {
          y: 42,
          color: colors[2],
          drilldown: {
            name: this.categories[0],
            categories: this.category1Hours,
            data: this.category1Data
          }
        },
        {
          y: 18,
          color: colors[1],
          drilldown: {
            name: this.categories[1],
            categories: this.category1Hours,
            data: this.category2Data
          }
        },
        {
          y: 16,
          color: colors[0],
          drilldown: {
            name: this.categories[2],
            categories: this.category3Hours,
            data: this.category3Data
          }
        },
        {
          y: 12,
          color: colors[3],
          drilldown: {
            name: this.categories[3],
            categories: this.category4Hours,
            data: this.category4Data
          }
        },
        {
          y: 13,
          color: colors[6],
          drilldown: {
            name: this.categories[4],
            categories: this.category5Hours,
            data: this.category5Data
          }
        }
      ],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: new HighCharts.Color(data[i].color).brighten(brightness).get()
        });
      }
    }

    // Create the chart
    HighCharts.chart('simpleDonut', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Device Share Usage'
      },
      subtitle: {
        text: 'Source: <a href="http://google.com/search?q=firebase DB" target="_blank">firebase DB</a>'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      series: [{
        name: 'Appliance',
        type: undefined,
        data: browserData,
        size: '60%',
        dataLabels: {
          formatter: function () {
            return this.y > 5 ? this.point.name : null;
          },
          color: '#ffffff',
          distance: -30
        }
      }, {
        name: 'Usage',
        type: undefined,
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          formatter: function () {
            // display only if larger than 1
            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
              this.y + '%' : null;
          }
        },
        id: 'versions'
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            series: [{
              type: undefined,
            }, {
              id: 'versions',
              type: undefined,
              dataLabels: {
                enabled: false
              }
            }]
          }
        }]
      }
    });
  }

  plotSemiDonutChart() {
    HighCharts.chart('semi', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: 'Appliances',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Appliances share',
        innerSize: '50%',
        data: this.applianceData
      }]
    });
  }

}
