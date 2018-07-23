import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectivesModule } from '../directives/shared-directives-module';

@NgModule({
    imports: [CommonModule, SharedDirectivesModule],
    exports: []
})

export class SharedComponentsModule { }