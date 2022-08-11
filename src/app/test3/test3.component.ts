import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.scss']
})
export class Test3Component implements OnInit {

  constructor() {
    console.log("inside constructor of Test3Component")
  }

  ngOnInit(): void {
    console.log("inside ngOnInit of Test3Component")
  }

}
