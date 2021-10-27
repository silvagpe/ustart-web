import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthConfiguration, AUTH_OPTIONS } from './configuration/auth-configuration';
import { AuthService } from './auth.service';
import { HttpAuthInterceptor } from './http-auth.interceptor';

@NgModule()
export class AuthModule {
  static forRoot(configuration: AuthConfiguration): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        configuration.AuthConfigurationProvider ||
        {
          provide: AUTH_OPTIONS,
          useValue: configuration.config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpAuthInterceptor,
          multi: true,
        },
        AuthService
      ]
    };
  }
}
