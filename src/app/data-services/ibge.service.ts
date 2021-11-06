import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Estado } from '../models/ibge/estado';
import { Cidade } from '../models/ibge/cidade';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(
    private http: HttpClient,
    private endpointsService: EndpointsService) { }

  public getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.endpointsService.getIbgeApiUrl()}api/v1/localidades/estados`);
  }

  public getCidades(estadoId: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.endpointsService.getIbgeApiUrl()}api/v1/localidades/estados/${estadoId}/distritos`);
  }
}
