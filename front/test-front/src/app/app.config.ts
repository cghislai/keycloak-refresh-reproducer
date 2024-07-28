import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {AuthConfig, provideOAuthClient} from "angular-oauth2-oidc";
import {provideHttpClient} from "@angular/common/http";

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:18080/realms/test',
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: 'front',
  responseType: 'code',
  scope: 'openid profile email offline_access',
  showDebugInformation: true,
  useSilentRefresh: false,
  silentRefreshTimeout: 20000,
  timeoutFactor: 0.8,
  sessionChecksEnabled: true,
  clearHashAfterLogin: true,
  nonceStateSeparator: 'semicolon',
  useIdTokenHintForSilentRefresh: true,
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {provide: AuthConfig, useValue: authConfig},
    provideOAuthClient()
  ]
};
