import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-label',
  templateUrl: './form-input-label.component.html',
  styleUrls: ['./form-input-label.component.scss']
})
export class FormInputLabelComponent implements OnInit {

  @Input() label:string;
  @Input() model:any;
  @Input() stateAlone:boolean = false;
  modelOptions:any = {}

  constructor() { 
    if (this.stateAlone){
      this.modelOptions = {standalone: true}
    }
  }

  ngOnInit(): void {
  }

}
