import { Injectable, Inject, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { first, switchMap, catchError } from 'rxjs/operators';
import { AUTH_OPTIONS } from './configuration/auth-configuration';
import { AuthService } from './auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private headerName: string;
  private authScheme: string;
  private interceptorSkipHeader = 'Skip-Interceptor';
  private refreshInProgress = false;
  private refreshSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private injector: Injector, @Inject(AUTH_OPTIONS) config: any) {
    this.headerName = config.headerName || 'Authorization';
    this.authScheme = config.authScheme || 'Bearer ';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(this.interceptorSkipHeader) && req.headers.get(this.interceptorSkipHeader) === 'true') {
      const headers = req.headers.delete(this.interceptorSkipHeader);
      req = req.clone({ headers });
      return next.handle(req);
    } else {
      return this.processIntercept(req, next);
    }
  }

  private processIntercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone: HttpRequest<any> = request.clone();

    return this.request(clone)
      .pipe(
        switchMap((req: HttpRequest<any>) => next.handle(req)),
        catchError((res: HttpErrorResponse, caught: any) => this.responseError(clone, res))
      );
  }

  private request(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    if (this.refreshInProgress) {
      return this.delayRequest(request);
    }

    return this.addToken(request);
  }

  private delayRequest(req: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.refreshSubject.pipe(
      first(),
      switchMap((status: boolean) =>
        status ? this.addToken(req) : throwError(req)
      )
    );
  }

  private responseError(request: HttpRequest<any>, response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const authService: AuthService = this.injector.get<AuthService>(AuthService);

    const needRefresh: boolean = response.status === 401 && authService.isLoggedIn;
    const onForbidden: boolean = response.status === 403;

    if (onForbidden && !needRefresh) {
      authService
        .onForbidden()
        .then(
          () => {
            request;
          });
    }

    if (needRefresh && !this.refreshInProgress) {
      this.refreshInProgress = true;

      authService
        .refreshToken()
        .then(
          //Sucesso
          () => {
            this.refreshInProgress = false;
            this.refreshSubject.next(true);
          },
          //Erro
          () => {
            this.refreshInProgress = false;
            this.refreshSubject.next(false);
          }
        )
        .catch(() => {
          this.refreshInProgress = false;
          this.refreshSubject.next(false);
        });
    }

    if (needRefresh && this.refreshInProgress) {
      return this.retryRequest(request, response);
    }

    return throwError(response);
  }

  private retryRequest(req: HttpRequest<any>, res: HttpErrorResponse): Observable<HttpEvent<any>> {
    const http: HttpClient = this.injector.get<HttpClient>(HttpClient);

    return this.refreshSubject.pipe(
      first(),
      switchMap((status: boolean) =>
        status ? http.request(req) : throwError(res || req)
      )
    );
  }


  private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    return new Observable((subscriber: any) => {
      const authService: AuthService = this.injector.get<AuthService>(AuthService);
      let token: any = authService.getAccessToken();

      request = request.clone({
        setHeaders: {
          [this.headerName!]: `${this.authScheme}${token}`
        }
      });
      subscriber.next(request);
      subscriber.complete();
    });
  }
}
