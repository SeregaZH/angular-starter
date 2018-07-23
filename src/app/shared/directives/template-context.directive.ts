import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[templateContext]'
})
export class TemplateContextDirective {

    private readonly viewContainer: ViewContainerRef;
    private currentView: EmbeddedViewRef<any>;

    constructor(viewContainer: ViewContainerRef) {
        this.viewContainer = viewContainer;
    }

    @Input() public set templateContext(context: any) {
        if (this.currentView) {
            this.viewContainer.remove(this.viewContainer.indexOf(this.currentView));
            this.currentView = undefined;
        }

        if (context.templateRef) {
            this.currentView = this.viewContainer.createEmbeddedView(
                context.templateRef,
                _.pickBy(context, (v, k) => k !== 'templateRef'));
        }
    }
}

export interface TemplateDirectiveInterface<T> {
    templateRef: TemplateRef<T>;
}