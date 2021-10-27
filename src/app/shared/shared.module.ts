import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputLabelComponent } from './form-input-label/form-input-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    FormInputLabelComponent,
  ],
  exports:[
    FormInputLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
  ]
})
export class SharedModule { }
