import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';
import { SharedComponentsModule } from '../shared/components/shared-components-module';
import { SharedDirectivesModule } from '../shared/directives/shared-directives-module';
import { SearchModule } from './search/search.module';

@NgModule({
    imports: [
        BrowserModule,
        HomeRoutes,
        SharedComponentsModule,
        SharedDirectivesModule,
        FormsModule,
        SearchModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [HomeComponent]
})
export class HomeModule { }
