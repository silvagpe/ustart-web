import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupos/grupo';


@Injectable({ providedIn: 'root' })
export class GrupoService {
    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    public get(pesquisar: string = null): Observable<Grupo[]> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/grupo-produto/?pesquisa=${pesquisar}`
        return this.http.get<Grupo[]>(url);
    }

    public getById(id: string = null): Observable<Grupo> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/grupo-produto/${id}`
        return this.http.get<Grupo>(url);
    }

    public add(grupo: Grupo): Observable<Grupo> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/grupo-produto/`
        return this.http.post<Grupo>(url, grupo);
    }

    public update(grupo: Grupo): Observable<Grupo> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/grupo-produto/${grupo.id}`;
        return this.http.put<Grupo>(url, grupo);
    }

    public delete(id: string): Observable<any> {            
        const url = `${this.endpointsService.getServerUrl()}api/v1/grupo-produto/${id}`;
        return this.http.delete<any>(url);
    }
}