import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  constructor() { }

  public test2Form=new FormGroup({
    name:new FormControl(""),
    age:new FormControl(0)
  })

  ngOnInit(): void {
  }

  exit(){
    if(!this.test2Form.dirty){
      return true;
    }
    return confirm("Data is not saved. Are you sure you want to exit?")
  }


  ngOnDestroy(){

  }
}
