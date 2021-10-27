import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppRoutes } from 'src/app/app-routes';
import { LoadingService } from 'src/app/core/components/uv-loading/loading.service';
import { UsuariosService } from 'src/app/data-services/usuarios.service';
import { Usuario } from 'src/app/models/users/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public searchValue: string;
  public users: Usuario[];
  public searching: boolean = false
  public pageIndex: number = 1;
  public total: number = 0;
  userSearch = new Subject<string>();
  

  constructor(
    private usersService: UsuariosService,
    private loadingService: LoadingService,
    private router: Router,
    private modal: NzModalService,
    ) { }


  ngOnInit(): void {

    this.userSearch.pipe(
      debounceTime(700),
      distinctUntilChanged())
      .subscribe(value => {
        this.searching = true;
        this.getUsers(value);
      });

      this.getUsers();

  }

  public onBack(): void {

  }

  public newUser(): void {
    this.router.navigateByUrl(AppRoutes.Users.CadUsuario())
  }

  public editUser(user: Usuario):void{
    this.router.navigate([AppRoutes.Users.CadUsuario(), user.id], {state: user});
  }

  public deleteUser(user: Usuario):void{
    if(confirm(`Deseja excluir o usuário ${user.nome} - ${user.email}?`)){
      this.usersService.delete(user.id).subscribe(
        (result) => {
          this.getUsers(this.searchValue);
        },
        (err) => {
          let msg : string = '';
          if (err.error){
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modal.error({
            nzTitle: 'Falha ao excluir o usuário',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                        ${msg}`
          });
          
        }
      );
    }
  }

  private getUsers(search: string = '') {
    this.searching = true;
    this.usersService.getUsers(search)
      .subscribe(
        (result) => {
          this.users = result;
        },
        (error) => {
          console.error(error);

        },
        () => {
          this.loadingService.dismiss();
          this.searching = false;
        })
  }

  public onPageIndexChange(index: any): void {
    this.pageIndex = index;
    this.getUsers();
  }

}
