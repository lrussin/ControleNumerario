import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
/// <reference types="@angular/localize" />

import { AppRoutes } from './app/app.routes';

platformBrowserDynamic().bootstrapModule(AppRoutes)
  .catch((err) => console.error(err));

