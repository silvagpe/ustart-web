import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadGrupoComponent } from './pages/cad-grupo/cad-grupo.component';
import { GruposComponent } from './pages/grupos/grupos.component';

const routes: Routes = [
  { path: '', component: GruposComponent },
  { path: 'cad-grupo', component: CadGrupoComponent },
  { path: 'cad-grupo/:id', component: CadGrupoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
