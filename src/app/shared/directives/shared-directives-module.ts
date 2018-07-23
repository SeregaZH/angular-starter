import { NgModule } from '@angular/core';
import { TemplateContextDirective } from './template-context.directive';

@NgModule({
    declarations: [TemplateContextDirective],
    exports: [TemplateContextDirective]
})

export class SharedDirectivesModule { }