import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'bar',
    loadChildren: './bar/bar.module#BarPageModule'
  },
  {
    path: 'pie',
    loadChildren: './pie/pie.module#PiePageModule'
  },
  {
    path: 'device',
    loadChildren: './deviceShare/device.module#DevicePageModule'
  },
  {
    path: 'scatter',
    loadChildren: './scatter/scatter.module#ScatterPageModule'
  },
  {
    path: 'dynamic',
    loadChildren: './dynamic/dynamic.module#DynamicPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
