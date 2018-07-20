import { Directive, Optional, TemplateRef } from '@angular/core';
import { Template } from '../../../shared/directives/template';

@Directive({
    selector: '[search-result-template]'
})

export class SearchResultTemplateDirective extends Template<SearchResultTemplateContextInterface> {
    constructor(@Optional() templateRef: TemplateRef<SearchResultTemplateContextInterface>) {
        super(templateRef);
    }
}

export interface SearchResultTemplateContextInterface {
    $implicit: object;
}
