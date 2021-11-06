import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    public get(pesquisar: string = null): Observable<Cliente[]> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/cliente/?pesquisa=${pesquisar}`
        return this.http.get<Cliente[]>(url);
    }

    public getById(id: string = null): Observable<Cliente> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/cliente/${id}`
        return this.http.get<Cliente>(url);
    }

    public add(cliente: Cliente): Observable<Cliente> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/cliente/`
        return this.http.post<Cliente>(url, cliente);
    }

    public update(cliente: Cliente): Observable<Cliente> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/cliente/${cliente.id}`;
        return this.http.put<Cliente>(url, cliente);
    }

    public delete(id: string): Observable<any> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/cliente/${id}`;
        return this.http.delete<any>(url);
    }
}