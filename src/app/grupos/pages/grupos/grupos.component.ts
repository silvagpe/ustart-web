import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  public titutlo: string = "Consulta de Grupos";  

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

}
