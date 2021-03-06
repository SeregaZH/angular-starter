import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SharedComponentsModule } from '../shared/components/shared-components-module';
import { SharedDirectivesModule } from '../shared/directives/shared-directives-module';
import { HomeModule } from '../home/home.module';

@NgModule(
    {
        imports: [
            RouterModule,
            CommonModule,
            BrowserAnimationsModule,
            SharedComponentsModule,
            SharedDirectivesModule,
            HomeModule
        ],
        declarations: [LayoutComponent],
        exports: [LayoutComponent]
    })

export class LayoutModule { }
