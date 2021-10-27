import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/core/components/uv-loading/loading.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private modal: NzModalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public submitForm(): void {    
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      this.loadingService.show();
      this.authService
      .signIn(this.form.get('username').value, this.form.get('password').value)
      .then(
        () => {          
          this.loadingService.dismiss();
          this.router.navigateByUrl('/', { replaceUrl: true });
        },
        (error) => {
          this.modal.error({
            nzTitle: 'Falha no login',
            nzContent: 'Usuário e/ou senha inválidos.'
          });
          console.log(error);
          this.loadingService.dismiss();
        }
      );
    }
  }
}
