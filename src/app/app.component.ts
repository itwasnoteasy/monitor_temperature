import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Live Monitor',
      url: '/home',
      icon: 'pulse'
    },
    {
      title: 'Device Analysis',
      url: '/device',
      icon: 'pie'
    },
    {
      title: 'Energy Consumption',
      url: '/pie',
      icon: 'bulb'
    },
    {
      title: 'Monthly Analysis',
      url: '/bar',
      icon: 'stats'
    },
    {
      title: 'Yearly Average',
      url: '/scatter',
      icon: 'grid'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
