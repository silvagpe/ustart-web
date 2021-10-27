import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AUTH_OPTIONS } from './configuration/auth-configuration';
import { Token } from './models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private configuration: any;
  public get clientId(): string {
    return this.configuration.clientId;
  }
  private _userName: string;
  public get userName(): string {
    return this._userName;
  }
  private _userId: string;
  public get userId(): string {
    return this._userId;
  }
  private isLoggedInChangedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isLoggedInChanged(): Observable<boolean> {
    return this.isLoggedInChangedSubject.asObservable();
  }

  private _isLoggedIn: boolean = false;
  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public set isLoggedIn(value: boolean) {
    if (this._isLoggedIn !== value) {
      this._isLoggedIn = value;
      this._userName = localStorage.getItem(this.configuration.userNameKeyName) || '';
      this._userId = localStorage.getItem(this.configuration.userIdKeyName) || '';
      this.isLoggedInChangedSubject.next(value);
    }
  }

  private accessTokenRefreshedSubject: Subject<string> = new Subject();

  get accessTokenRefreshed(): Observable<string> {
    return this.accessTokenRefreshedSubject.asObservable();
  }

  private refreshTokenFailedSubject: Subject<any> = new Subject();

  get refreshTokenFailed(): Observable<any> {
    return this.refreshTokenFailedSubject.asObservable();
  }

  constructor(private injector: Injector, @Inject(AUTH_OPTIONS) config: any) {
    if (!config)
      throw 'Configuration object not set!';
    this.configuration = config;
    this.isLoggedIn = !!localStorage.getItem(this.configuration.tokenKeyName);
  }

  // public sendResetPassword(username: string, tenantAdress: string): Promise<any> {
  //   return new Promise<any>(async (resolve, reject) => {
  //     const http: HttpClient = this.injector.get<HttpClient>(HttpClient);
  //     let authority: string = await this.getAuthority();
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Skip-Interceptor': 'true'
  //       })
  //     };
  //     let url: string = authority + '/info/account/sendresetpasswordrequest?username=' + username + '&tenantAdress=' + tenantAdress;
  //     http.get(url, httpOptions).subscribe((res: any) => {
  //       resolve(res);
  //     }, (error: any) => {
  //       reject(error);
  //     });
  //   });
  // }

  public signIn(username: string, password: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const http: HttpClient = this.injector.get<HttpClient>(HttpClient);
      let url: string = await this.composeAuthority() + '/login';
      this._userName = username;
      http.post(url, { email: username, senha: password })
        .subscribe(
          (res: Token) => {
            let success = res && res.token;
            if (success) {
              this.storeResponse(res);
              this.isLoggedIn = true;
            }
            resolve();
          },
          (error) => {
            this.signOut();
            reject(error);
          });
    });
  }

  public refreshToken(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const http: HttpClient = this.injector.get<HttpClient>(HttpClient);
      let url: string = await this.composeAuthority() + '/refreshtoken';
      const httpOptions = {
        headers: new HttpHeaders({
          'Skip-Interceptor': 'true',
        })
      };
      http.post(url, { refresh_token: this.getRefreshToken() }, httpOptions)
        .subscribe(
          (res: Token) => {
            let success = res && res.token;
            if (success) {
              this.storeResponse(res);
              this.accessTokenRefreshedSubject.next(res.token);
            }
            resolve();
          },
          (error) => {
            this.signOut();
            this.refreshTokenFailedSubject.next(error);
            reject(error);
          });
    });
  }

  public getAccessToken(): string {
    if (this.isLoggedIn) {
      let token = JSON.parse(localStorage.getItem(this.configuration.tokenKeyName) || '');
      if (token != null)
        return token.token;
      else {
        this.isLoggedIn = false;
        return '';
      }
    }
    return '';
  }

  public getRefreshToken(): string {
    if (this.isLoggedIn) {
      let token = JSON.parse(localStorage.getItem(this.configuration.tokenKeyName) || '');
      if (token != null)
        return token.refresh_token;
      else {
        this.isLoggedIn = false;
        return '';
      }
    }
    return '';
  }

  public signOut(): void {
    localStorage.removeItem(this.configuration.tokenKeyName);
    localStorage.removeItem(this.configuration.userNameKeyName);
    this._userName = '';
    this._userId = '';
    this.isLoggedIn = false;
  }

  private async getAuthority(): Promise<any> {
    const authorityGetter: any = this.configuration.authorityEndpointGetter();
    let authority: string;
    if (authorityGetter instanceof Promise)
      authority = await this.configuration.authorityEndpointGetter();
    else
      authority = this.configuration.authorityEndpointGetter();
    return authority ? authority.replace(/\/$/, '') : null;
  }

  public async onForbidden(): Promise<any> {
    const onForbiddenGetter: any = this.configuration.onForbidden();

    if (onForbiddenGetter instanceof Promise)
      return await this.configuration.onForbidden();
    else
      return this.configuration.onForbidden();
  }

  private async composeAuthority(): Promise<any> {
    let authority: string = await this.getAuthority();
    return `${authority}`;
  }

  private storeResponse(response: any): void {
    localStorage.setItem(this.configuration.tokenKeyName, JSON.stringify(response));
    localStorage.setItem(this.configuration.userNameKeyName, this.userName);
  }
}

