import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, NoPreloading } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component

import '../styles/styles.scss';
import '../styles/headings.css';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ LayoutComponent ],
    /**
     * Import Angular's modules.
     */
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        LayoutModule,
        RouterModule.forRoot(ROUTES, {
            useHash: Boolean(history.pushState) === false,
            preloadingStrategy: NoPreloading
        }),

        /**
         * This section will import the `DevModuleModule` only in certain build types.
         * When the module is not imported it will get tree shaked.
         * This is a simple example, a big app should probably implement some logic
         */
        ...environment.showDevModule ? [] : [],
    ],
    /**
     * Expose our Services and Providers into Angular's dependency injection.
     */
    providers: [ environment.ENV_PROVIDERS ]
})
export class AppModule {}

export const ROOT_SELECTOR = 'vd-layout';
