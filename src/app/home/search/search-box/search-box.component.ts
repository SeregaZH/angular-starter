import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'fi-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: [ './search-box.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent {

    @Output()
    public onSearch: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public blur: EventEmitter<SearchBlurEventInterface> = new EventEmitter<SearchBlurEventInterface>();

    public onKeyPress(event: KeyboardEvent, criteria: string): void {
        if (event.keyCode === 13) {
            this.onSearch.emit(criteria);
        }
    }

    public onBlur(event: Event, criteria:string): void {
        this.onSearch.emit(criteria);
        this.blur.emit({event: event, criteria: criteria});
    }
}

export interface SearchBlurEventInterface {
    event: Event;
    criteria: string;
}