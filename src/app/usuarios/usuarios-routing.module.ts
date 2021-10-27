import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoUsuarioComponent } from './pages/novo-usuario/novo-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'cad-usuario', component: NovoUsuarioComponent },
  { path: 'cad-usuario/:id', component: NovoUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
