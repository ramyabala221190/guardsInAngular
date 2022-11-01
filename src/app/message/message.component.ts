import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  hide(){
    this.messageService.setIsDisplayed(false);
   this.router.navigate([{outlets:{popup:null}}]);
  }

}
