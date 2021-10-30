import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { GrupoService } from 'src/app/data-services/grupos.service';
import { Grupo } from 'src/app/models/grupos/grupo';



@Component({
  selector: 'app-cad-grupo',
  templateUrl: './cad-grupo.component.html',
  styleUrls: ['./cad-grupo.component.scss']
})
export class CadGrupoComponent implements OnInit {

  private idSeleciondo:string
  public novoRegistro: boolean = false
  public grupo:Grupo

  public form:FormGroup = new FormGroup({
    descricao : new FormControl(null, [Validators.required]),
    codigoExterno: new FormControl(null)
  });

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private grupoService: GrupoService,
  ) { 
    this.activatedRoute.params.subscribe((params)=>{
      this.idSeleciondo = params.id;

      if (this.idSeleciondo == null || this.idSeleciondo.toLocaleLowerCase() == "novo"){
        this.grupo = new Grupo();
        this.novoRegistro = true;
      }else{
        this.pesquisarPorId();
      }
    })
  }

  ngOnInit(): void {
  }

  public cancelar():void{    
    this.router.navigateByUrl(AppRoutes.Grupos.base());
  }  

  private pesquisarPorId(){
    this.grupoService.getById(this.idSeleciondo).subscribe(
      (result)=>{
        this.grupo = result;
        this.carregarDados();
      }, 
      (erro)=>{
        console.log(erro)
      })
  }

  private carregarDados(){
    if (this.grupo){
      this.form.get("descricao").setValue(this.grupo.descricao)
      this.form.get("codigoExterno").setValue(this.grupo.codigoExterno)
    }
  }

  public salvar():void{
    
  }


}
