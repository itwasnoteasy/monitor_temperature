import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-pie',
  templateUrl: 'pie.page.html',
  styleUrls: ['pie.page.scss'],
})
export class PiePage {
  constructor() { }

  ionViewDidEnter() {
    this.plotSimplePieChart();
    // this.plotSimpleDonutChart();
    // this.plotSemiDonutChart();
  }

  plotSimplePieChart() {
    let myChart = HighCharts.chart('simplePie', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Energy consumption'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        name: 'Consumption',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Refrigerator',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Oven',
          y: 11.84
        }, {
          name: 'Dishwasher',
          y: 10.85
        }, {
          name: 'TV',
          y: 4.67
        }, {
          name: 'Washer/Dryer',
          y: 4.18
        }, {
          name: 'Light Bulbs',
          y: 1.64
        }, {
          name: 'Mobile Devices',
          y: 1.6
        }, {
          name: 'Garage door',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }

  plotSimpleDonutChart() {
    var colors = HighCharts.getOptions().colors,
      categories = [
        'Microwave',
        'TV',
        'Dishwasher',
        'Light Bulbs',
        'Other'
      ],
      data = [
        {
          y: 42,
          color: colors[2],
          drilldown: {
            name: 'Microwave',
            categories: [
              '8-9 AM',
              '9-10 AM',
              '10-3 PM',
              '3-5 PM',
              '5-8 PM',
              '8-11 PM'
            ],
            data: [
              5.5,
              2.5,
              11.4,
              4.6,
              6.25,
              11.75
             ]
          }
        },
        {
          y: 18,
          color: colors[1],
          drilldown: {
            name: 'TV',
            categories: [
              '8-9 AM',
              '9-10 AM',
              '10-3 PM',
              '3-5 PM',
              '5-8 PM',
              '8-11 PM',
            ],
            data: [
              0.1,
              2.3,
              3.7,
              1.6,
              3.4,
              6.9
            ]
          }
        },
        {
          y: 16,
          color: colors[0],
          drilldown: {
            name: 'Dishwasher',
            categories: [
              '10-3 PM',
              '3-5 PM',
              '5-8 PM',
              '8-11 PM',
            ],
            data: [
              1.2,
              4.8,
              3.8,
              6.2
            ]
          }
        },
        {
          y: 12,
          color: colors[3],
          drilldown: {
            name: 'LightBulbs',
            categories: [
              '6AM-Noon',
              '12-5 PM',
              '5-11 PM'
            ],
            data: [
              1.7,
              2,
              8.3
            ]
          }
        },
        {
          y: 13,
          color: colors[6],
          drilldown: {
            name: 'Other',
            categories: [
              'Other'
            ],
            data: [
              13
            ]
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
        text: 'Source: <a href="http://google.com/search?q=sample data" target="_blank">sampledata</a>'
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
        data: [
          ['Microwave', 58.9],
          ['Dishwasher', 13.29],
          ['Refrigerator', 13],
          ['TV', 3.78],
          ['Light Bulbs', 3.42],
          {
            name: 'Other',
            y: 7.61,
            dataLabels: {
              enabled: false
            }
          }
        ]
      }]
    });
  }

}
