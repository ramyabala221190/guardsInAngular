import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'allGuards';
  loading:boolean=true;

  constructor(private router:Router){
    this.router.events.subscribe((event:Event)=>{
      if(event instanceof NavigationStart){
       this.loading=true;
      }
      if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
      this.loading=false;
      }
    })
  }
}
