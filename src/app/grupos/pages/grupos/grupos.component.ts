import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounce } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppRoutes } from 'src/app/app-routes';
import { GrupoService } from 'src/app/data-services/grupos.service';
import { Grupo } from 'src/app/models/grupos/grupo';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  public titutlo: string = "Consulta de Grupos";
  public loading: boolean = false;
  public grupos: Grupo[] = [];

  constructor(
    private router: Router,
    private grupoService: GrupoService,
    private modalService:NzModalService
  ) {

    this.localizar = debounce(this.localizar, 400);
  }

  ngOnInit(): void {
    this.pesquisar("");
  }

  public novoGrupo(): void {
    var url = `${AppRoutes.Grupos.CadGrupo()}/novo`        
    this.router.navigateByUrl(url);
  }

  public editar(grupo: Grupo): void {
    var url = `${AppRoutes.Grupos.CadGrupo()}/${grupo.id}`        
    this.router.navigateByUrl(url);
  }

  public localizar(event): void {    
    this.pesquisar(event.target.value);
  }

  
  public excluir(grupo: Grupo): void {
    if (confirm(`Deseja excluir esse item? ${grupo.descricao}`)){
      this.grupoService.delete(grupo.id).subscribe(
        (result)=>{
          this.pesquisar("")
         }, 
        (erro)=>{
          this.modalService.error({
            nzTitle: "Erro ao excluir registro",
            nzContent:  `Não foi possível excluir esse grupo: ${grupo.descricao}` 
          });
        })
    }
  }

  public pesquisar(pesquisa: string): void {
    this.loading = true;
    this.grupoService.get(pesquisa).subscribe(
      (result) => {
        this.grupos = result;
        this.loading = false;
      },
      (erro) => {
        this.loading = false;
        console.log(erro);
      });
  }
}
