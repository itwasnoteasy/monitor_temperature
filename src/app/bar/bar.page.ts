import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-bar',
  templateUrl: 'bar.page.html',
  styleUrls: ['bar.page.scss'],
})
export class BarPage {
  constructor() { }

  ionViewDidEnter() {
    this.plotSimpleBarChart();
    this.plotStackedBarChart();
    this.plotNegativeBarChart();
    this.plotVerticalBarChart();
  }

  plotSimpleBarChart() {
    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Avg Temp/Humidity'
      },
      xAxis: {
        categories: ['Apr', 'May', 'June', 'July', 'August']
      },
      yAxis: {
        title: {
          text: 'Average'
        }
      },
      series: [
        {
          name: 'Temperature(℉)',
          type: undefined,
          data: [67.6, 68.9, 71.5, 76.6, 80.3]
        },
        {
          name: 'Humidity(%)',
          type: undefined,
          data: [73.2, 68.1, 65.1, 63.8, 60.5]
        }]
    });
  }

  plotStackedBarChart() {
    let myChart = HighCharts.chart('stacked', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'kWH Consumption'
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun', 'July', 'Aug']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Electricity consumption'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'Sprinkler',
        type: undefined,
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'M-wave',
        type: undefined,
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'TV',
        type: undefined,
        data: [3, 4, 4, 2, 5]
      }]
    });
  }

  plotNegativeBarChart() {
    let myChart = HighCharts.chart('negative', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Avg. Savings/Device'
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      yAxis: {
        // min: -5,
        title: {
          text: 'Watts saved/day'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Sprinkler',
        type: undefined,
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'M-wave',
        type: undefined,
        data: [2, -2, -3, 2, 1]
      }, {
        name: 'TV',
        type: undefined,
        data: [3, 4, 4, -2, 5]
      }]
    });
  }

  plotVerticalBarChart() {
    let myChart = HighCharts.chart('vertical', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Temp/Humidity Deviation'
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      yAxis: {
        title: {
          text: 'Deviation from previous Month'
        }
      },
      series: [
        {
          name: 'Temperature',
          type: undefined,
          data: [2, 3, 1, 0, 4]
        },
        {
          name: 'Humidity',
          type: undefined,
          data: [1, 1, 5, 7, 3]
        }]
    });
  }

}
