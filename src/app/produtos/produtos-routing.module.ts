import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadProdutoComponent } from './pages/cad-produto/cad-produto.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

const routes: Routes = [
  { path: '', component: ProdutosComponent },
  { path: 'cad-produto', component: CadProdutoComponent },
  { path: 'cad-produto/:id', component: CadProdutoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
