import {ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation} from '@angular/core';
import { SearchResultTemplateDirective } from './search-result-template.directive';

@Component({
    selector: 'search-results',
    templateUrl: './search-results.component.html',
    styleUrls: [ './search-results.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class SearchResultsComponent {

    @ContentChild(SearchResultTemplateDirective)
    public searchResultTemplate: SearchResultTemplateDirective;

    @Input()
    public searchResults: any[];

    public getItemPreviewLink(item: any): string {
        return `https://dropbox.com/home?preview=${item.DisplayName}`;
    }
}
