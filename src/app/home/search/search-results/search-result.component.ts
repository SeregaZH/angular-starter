import { Component, ContentChild, TemplateRef } from '@angular/core';
import {
    SearchResultTemplateContextInterface,
    SearchResultTemplateDirective
} from './search-result-template.directive';

@Component({
    selector: 'search-result',
    template: ''
})

export class SearchResultComponent {

    @ContentChild(SearchResultTemplateDirective)
    public searchResultTemplate: SearchResultTemplateDirective;

    public searchResultTemplateRef: TemplateRef<SearchResultTemplateContextInterface>;

    constructor() {
        this.searchResultTemplateRef = this.searchResultTemplate && this.searchResultTemplate.templateRef;
    }
}