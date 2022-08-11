import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModAModule } from './mod-a/mod-a.module';
import { ResolverAService } from './resolver-a.service';
import { RouteDeactiveGuard } from './route-deactive.guard';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';

const routes: Routes = [
  {
    path:'test',
    loadChildren:()=>import('./mod-a/mod-a.module').then(m=>ModAModule),
    canLoad:[RouteDeactiveGuard],
    canActivate:[RouteDeactiveGuard]
  },
  {
    path:'test2',
    component:Test2Component,
    canActivate:[RouteDeactiveGuard],
    canDeactivate:[RouteDeactiveGuard],
    resolve:{
      todo:ResolverAService
    }},
    {
      path:'test3',
      component:Test3Component
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
