import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Observable } from 'rxjs';
import { Produto } from '../models/produtos/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    public get(pesquisar: string = null): Observable<Produto[]> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/produto/?pesquisa=${pesquisar}`
        return this.http.get<Produto[]>(url);
    }

    public getById(id: string = null): Observable<Produto> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/produto/${id}`
        return this.http.get<Produto>(url);
    }

    public add(produto: Produto): Observable<Produto> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/produto/`
        return this.http.post<Produto>(url, produto);
    }

    public update(produto: Produto): Observable<Produto> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/produto/${produto.id}`;
        return this.http.put<Produto>(url, produto);
    }

    public delete(id: string): Observable<any> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/produto/${id}`;
        return this.http.delete<any>(url);
    }
}