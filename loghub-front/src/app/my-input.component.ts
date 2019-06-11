import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})

export class MyInputComponent  implements OnInit{


  inData;
  
  ngOnInit(){
    this.inData = 10;
  }
  

  onDataInput(inData){
    this.inData = inData;
  }



}
