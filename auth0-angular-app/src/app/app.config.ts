import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'penniq.uk.auth0.com',
      clientId: '6Ap7vmTz2o5ZYefDhJAbD16JGuO6WgtP',
      authorizationParams: {
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      },
    }),
  ],
};
