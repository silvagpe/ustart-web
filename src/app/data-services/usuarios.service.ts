import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EndpointsService } from "../core/services/endpoints/endpoints.service";
import { Usuario } from "../models/users/usuario";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService) { }

    public getUsers(search: string = null): Observable<Usuario[]> {

        return this.http.get<Usuario[]>(`${this.endpointsService.getServerUrl()}api/v1/usuario/?pesquisa=${search}`);
    }

    public getUserById(id: string): Observable<Usuario> {

        return this.http.get<Usuario>(`${this.endpointsService.getServerUrl()}api/v1/usuario/${id}`);
    }

    public novoUsuario(usuario: Usuario): Observable<any> {

        return this.http.post<any>(`${this.endpointsService.getServerUrl()}api/v1/usuario`, usuario);
    }

    public atualizarUsuario(user: Usuario): Observable<any> {
        return this.http.put<Usuario>(`${this.endpointsService.getServerUrl()}api/v1/usuario/${user.id}`, user);
    }

    public salvarUsuario(id: string, user: Usuario): Observable<any> {

        if (id == null || id == "") {
            return this.http.post<Usuario>(`${this.endpointsService.getServerUrl()}api/v1/usuario`, user);
        } else {
            return this.http.put<Usuario>(`${this.endpointsService.getServerUrl()}api/v1/usuario/${id}`, user);
        }
    }

    public delete(id: string): Observable<any> {

        return this.http.delete<any>(`${this.endpointsService.getServerUrl()}api/v1/usuario/${id}`);
    }
}