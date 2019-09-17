import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-scatter',
  templateUrl: 'scatter.page.html',
  styleUrls: ['scatter.page.scss'],
})
export class ScatterPage {
  constructor() { }

  ionViewDidEnter() {
    this.plotSimpleScatterChart();
  }

  plotSimpleScatterChart() {
    let myChart = HighCharts.chart('scatter', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'scatter'
      },
      title: {
        text: 'Month over Month'
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Months',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Jan',
          y: 41.41
        }, {
          name: 'Feb',
          y: 38.83
        }, {
          name: 'Mar',
          y: 44.85
        }, {
          name: 'Apr',
          y: 54.67
        }, {
          name: 'May',
          y: 52.18
        }, {
          name: 'Jun',
          y: 61.64
        }, {
          name: 'Jul',
          y: 66.6
        }, {
          name: 'Aug',
          y: 64.2
        }, {
          name: 'Sep',
          y: 54.61,
          sliced: true,
          selected: true
        }, {
          name: 'Oct',
          y: 44.21
        }, {
          name: 'Nov',
          y: 48.1
        }, {
          name: 'Dec',
          y: 50.6
        }]
      }]
    });
  }

}
