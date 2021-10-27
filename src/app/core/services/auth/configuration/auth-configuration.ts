import { InjectionToken, Provider } from '@angular/core';

export const AUTH_OPTIONS = new InjectionToken('AUTH_OPTIONS');

export interface AuthConfiguration {
  AuthConfigurationProvider?: Provider,
  config?: {
    authorityEndpointGetter?: () => string | Promise<string>;
    onForbidden?: () => void | Promise<any>;
    headerName?: string;
    authScheme?: string;
    clientId?: string;
    scope?: string;
    tokenKeyName?: string;
  }
}
