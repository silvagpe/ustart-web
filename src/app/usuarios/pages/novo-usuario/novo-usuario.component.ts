import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppRoutes } from 'src/app/app-routes';
import { LoadingService } from 'src/app/core/components/uv-loading/loading.service';
import { UsuariosService } from 'src/app/data-services/usuarios.service';
import { Usuario } from 'src/app/models/users/usuario';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent implements OnInit {

  formGroup!: FormGroup;
  private novo: boolean = true;
  private selectedId: string = "";
  public selectedUser: Usuario = new Usuario();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modal: NzModalService,
    private usersService: UsuariosService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {

    this.configFormValidation(null);
    this.selectedId = this.activeRoute.snapshot.paramMap.get("id");
    if (this.selectedId !== null && this.selectedId !== "") {
      this.loadData();
    }
  }

  back(): void {
    this.router.navigateByUrl(AppRoutes.Users.base());
  }

  loadData(): void {

    this.loadingService.show();

    this.usersService.getUserById(this.selectedId).subscribe(
      (result) => {
        this.novo = false;
        this.selectedUser = result;
        this.configFormValidation(this.selectedUser);
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.loadingService.dismiss();

      });
  }

  configFormValidation(user: Usuario): void {

    const newUser: Boolean = this.selectedId == null || this.selectedId == "";

    this.formGroup = this.formBuilder.group({
      email: [user != null ? user.email : null, [Validators.required, Validators.email]],
      senha: [null, [Validators.minLength(4)]],
      nome: [user != null ? user.nome : null, [Validators.required]],
      ativo: [user != null ? user.ativo : true]
    });

    var senhaInput = this.formGroup.get("senha");
    if (newUser) {
      senhaInput.setValidators([Validators.required, Validators.minLength(4)]);
    }
  }


  submitForm(): void {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }
    if (this.selectedUser == null) {
      this.selectedUser = new Usuario();
    }

    if (this.formGroup.valid) {
      this.selectedUser.ativo = this.formGroup.value.ativo;
      this.selectedUser.email = this.formGroup.value.email;
      this.selectedUser.nome = this.formGroup.value.nome;
      this.selectedUser.senha = this.formGroup.value.senha;
      if (this.selectedId != null && this.selectedId != "")
        this.selectedUser.id = this.selectedId;

      const operacao = this.novo
        ? this.usersService.novoUsuario(this.selectedUser)
        : this.usersService.atualizarUsuario(this.selectedUser);

      operacao.subscribe(
        (result) => {
          this.back();          
        },
        (err) => {
          let msg: string = '';
          if (err.error) {
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modal.error({
            nzTitle: 'Falha ao registrar usuário',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                        ${msg}`
          });
        }
      );
    }
  }
}
