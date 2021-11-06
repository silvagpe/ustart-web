import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClienteService } from 'src/app/data-services/cliente.service';
import { Cliente } from 'src/app/models/clientes/cliente';
import { debounce } from 'lodash';
import { AppRoutes } from 'src/app/app-routes';

@Component({
  selector: 'app-cliente',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClienteComponent implements OnInit {

  public loading: boolean = false;
  public clientes: Cliente[] = [];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private modalService: NzModalService
  ) {

    this.localizar = debounce(this.localizar, 400);
  }


  ngOnInit(): void {
    //Pesquisa inicial quando entra na tela
    this.pesquisar("");
  }

  public novo(): void {
    const url = `${AppRoutes.Clientes.CadCliente()}/novo`;
    this.router.navigateByUrl(url);
  }

  public localizar(event: any): void {    
    this.pesquisar(event.target.value);

    // if (value && value.trim() !== '') {
    //   this.pesquisar(value);
    // } else {
    //   this.limparPesquisa();
    // }
  }

  private pesquisar(pesquisa: string): void {
    this.loading = true;
    this.clienteService.get(pesquisa).subscribe(
      (result) => {
        this.clientes = result;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  public limparPesquisa(): void {
    console.log("limpar");
    this.pesquisar("");
  }

  public editar(cliente: Cliente): void {
    var url = `${AppRoutes.Clientes.CadCliente()}/${cliente.id}`;
    this.router.navigateByUrl(url);
  }

  public excluir(cliente: Cliente): void {
    if (confirm(`Deseja excluir o registro ${cliente.nome}?`)) {
      this.clienteService.delete(cliente.id).subscribe(
        (result) => {
          this.pesquisar("");
        },
        (err) => {
          let msg: string = '';
          if (err.error) {
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modalService.error({
            nzTitle: 'Falha ao excluir o registro',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                        ${msg}`
          });

        }
      );
    }
  }
}
