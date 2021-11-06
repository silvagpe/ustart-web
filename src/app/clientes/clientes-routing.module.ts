import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadClienteComponent } from './pages/cad-cliente/cad-cliente.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'cad-cliente', component: CadClienteComponent },
  { path: 'cad-cliente/:id', component: CadClienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
