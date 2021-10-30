import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { Grupo } from 'src/app/models/grupos/grupo';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  public titutlo: string = "Consulta de Grupos";  
  public teste: string = "";

  constructor() { 

    this.localizar = debounce(this.localizar, 400);
  }

  ngOnInit(): void {
  }

  public novoGrupo(): void {
    console.log("novo grupo");
  }

  public localizar(event):void{
    console.log(event.target.value);
  }

  public editar(grupo:Grupo): void {
    console.log("editar grupo");
  }

  public excluir(grupo:Grupo): void {
    console.log("excluir grupo");
  }

}
