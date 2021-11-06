import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  public getServerUrl(): string {
    return environment.apiUrl;
  }

  public getLoginUrl(): string {
    return `${environment.apiUrl}api/v1/autenticacao`;
  }

  public getIbgeApiUrl(): string {
    return `https://servicodados.ibge.gov.br/`;
  }
}
