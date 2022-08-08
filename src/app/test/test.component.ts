import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private router:Router) { }

  public testForm=new FormGroup({
    name:new FormControl(""),
    age:new FormControl(0)
  })

  ngOnInit(): void {
  }

  exit(){
    if(!this.testForm.dirty){
      return true;
    }
    return confirm("Data is not saved. Are you sure you want to exit?")
  }


  ngOnDestroy(){

  }

}
