import { TemplateRef } from '@angular/core';
import { TemplateDirectiveInterface } from './template-context.directive';

export abstract class Template<TContext> implements TemplateDirectiveInterface<TContext> {

    public readonly templateRef: TemplateRef<TContext>;

    constructor(templateRef: TemplateRef<TContext>) {
        this.templateRef = templateRef;
    }
}