import {ChangeDetectionStrategy, Component} from '@angular/core';
import 'rxjs/add/operator/map';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchService, Query } from 'asc-test';
import { PageModelInterface } from './paging/paging.component';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: [ './search.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent {

    private static readonly DefaultQuery: Query = {
        orderby: 'search.score() asc',
        highlight: 'content-2',
        count: true
    };
    private searchClient: SearchService;
    private currentSearch: Query = SearchComponent.DefaultQuery;

    public searchResults: Observable<{ data: any[], total: number }>;
    public currentPage = 0;

    constructor() {
        this.searchClient = new SearchService(
            'file-search',
            '87134F02F62DD99A8DE49BF0BF5A74C8',
            '2016-09-01');
    }

    public changeSearch(criteria: string): void {
        if (criteria !== this.currentSearch.search) {
            this.currentSearch.search = criteria;
            this.currentSearch.skip = 0;
            this.currentPage = 0;
            this.performSearch(this.currentSearch);
        }
    }

    public changePage(pageModel: PageModelInterface): void {
        this.currentPage = pageModel.page;
        this.performSearch(
            {...this.currentSearch, ...{ skip: pageModel.skip, top: pageModel.top } }
            );
    }

    private performSearch(query: Query): void {
        this.searchResults = from<any>(this.searchClient
            .indexes
            .use<any>('azureblob-index')
            .search(query))
            .pipe(
                // map(x => console.log(x)),
                map(x => x.result ?
                    { data: x.result.value, total: x.result['@odata.count'] } :
                    { data: [], total: 0 })
            );
        this.currentSearch = query;
    }
}