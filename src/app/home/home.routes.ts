﻿import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutes: ModuleWithProviders = RouterModule.forRoot([
    {
        path: 'home',
        component: HomeComponent
    }
]);