import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBoxComponent} from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultTemplateDirective } from './search-results/search-result-template.directive';
import { SearchComponent } from './search.component';
import { SearchResultComponent } from './search-results/search-result.component';
import { PagingComponent } from './paging/paging.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        SearchComponent,
        SearchBoxComponent,
        SearchResultsComponent,
        SearchResultTemplateDirective,
        SearchResultComponent,
        PagingComponent
    ],
    exports: [
        SearchComponent,
        SearchResultsComponent,
        SearchResultTemplateDirective
    ]
})

export class SearchModule {}
