import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  isDisplayed:boolean=false;

  setIsDisplayed(status:boolean){
    this.isDisplayed=status;
  }

  getIsDisplayed(){
    return this.isDisplayed;
  }
}
