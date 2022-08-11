import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'allGuards';

  constructor(private router:Router){
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationStart){
        console.log(`Navigation to ${event.url} has started`);
      }
      if(event instanceof NavigationEnd){
        console.log(`Navigation to ${event.url} has completed`);
      }
      if(event instanceof NavigationCancel){
        console.log(`Navigation to ${event.url} has been cancelled`);
      }
      if(event instanceof NavigationError){
        console.log(`Navigation to ${event.url} has errored out`);
      }

    })
  }
}
