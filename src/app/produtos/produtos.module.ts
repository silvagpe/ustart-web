import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CadProdutoComponent } from './pages/cad-produto/cad-produto.component';


@NgModule({
  declarations: [
    ProdutosComponent,
    CadProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
