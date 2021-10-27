import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { AuthGuard } from './core/guards/auth-guard';
import { LoginGuard } from './core/guards/login-guard';
import { LoginComponent } from './login/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: AppRoutes.Login.base(),
    component: LoginComponent,
    canActivate: [LoginGuard]
  },   
  {
    path: AppRoutes.Users.base(),
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
