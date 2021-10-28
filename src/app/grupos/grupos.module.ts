import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './pages/grupos/grupos.component';
import { CadGrupoComponent } from './pages/cad-grupo/cad-grupo.component';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [
    GruposComponent,
    CadGrupoComponent
  ],
  imports: [
    CommonModule,
    GruposRoutingModule,
    NzPageHeaderModule,
    NzLayoutModule,    
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,       
    NzTableModule,
    NzPaginationModule,
    NzIconModule,
    NzSpinModule
  ]
})
export class GruposModule { }
