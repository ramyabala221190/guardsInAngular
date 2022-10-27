import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModAModule } from './mod-a/mod-a.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResolverAService } from './resolver-a.service';
import { RouteDeactiveGuard } from './route-deactive.guard';

const routes: Routes = [
  //you always start with more specific routes and then progress towards less specific ones
  {
    path:'user',
    loadChildren:()=>import('./mod-a/mod-a.module').then(m=>ModAModule),
    // canLoad:[RouteDeactiveGuard],
    // canActivate:[RouteDeactiveGuard]
  },
    {
      path:'',redirectTo:'user',pathMatch:'full' //default path
    },
    {
      path:'**',component:PageNotFoundComponent //wildcard path
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
