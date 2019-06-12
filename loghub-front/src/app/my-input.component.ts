import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})

export class MyInputComponent implements OnInit {

  inData = '';

  onKey(event: KeyboardEvent) {
    this.inData = (<HTMLInputElement>event.target).value;
  }

  onEnter(value: string) { 
  }

  ngOnInit() {

  }



}
