import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { MessageModule } from './message/message.module';
import { ModAModule } from './mod-a/mod-a.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResolverAService } from './resolver-a.service';
import { RouteDeactiveGuard } from './route-deactive.guard';
import { CustomPreloadStrategy } from './selective-strategy.service';

const routes: Routes = [
  //you always start with more specific routes and then progress towards less specific ones
  {
    path:'user',
    loadChildren:()=>import('./mod-a/mod-a.module').then(m=>ModAModule),
    canLoad:[RouteDeactiveGuard],
  },
  {
  path:'login',
component:LoginComponent
  },
  {
   path:'message',
   loadChildren:()=>import('./message/message.module').then(m=>MessageModule),
   outlet:'popup',
   data:{preload:true}
  },
    {
      path:'',redirectTo:'user',pathMatch:'full' //default path
    },
    {
      path:'**',component:PageNotFoundComponent //wildcard path
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing:true,preloadingStrategy:CustomPreloadStrategy}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
