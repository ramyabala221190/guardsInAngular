import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  showMessage(){
    this.messageService.setIsDisplayed(true);
    this.router.navigate([
      {
        outlets:{popup:['message']}
      }
    ])
  }

}
