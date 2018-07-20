import {
    ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output,
    SimpleChanges
} from '@angular/core';
import {ParameterValidator, validateParameters, ValidationResultInterface} from './parameters-validation';

declare type FramePages = { [pageNumber: number]: Page };

@Component({
    selector: 'paging',
    templateUrl: './paging.component.html',
    styleUrls: [ './paging.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: ParameterValidator, useValue: validateParameters }]
})
export class PagingComponent implements OnChanges, OnInit {

    private currentFrame: number = 0;
    private pageCount: number = 0;
    private totalItems: number = 0;

    @Input()
    public set total(value: number) {
        this.totalItems = value;
        this.pageCount = this.computePageSize(value, this.itemsPerPage);
    };

    public get total(): number {
        return this.totalItems;
    };

    @Input()
    public page: number = 0;

    @Input()
    public itemsPerPage: number = 50;

    @Input()
    public frameSize: number = 20;

    @Output()
    public pageChanged: EventEmitter<PageModelInterface> = new EventEmitter<PageModelInterface>();

    public framePages: FramePages = {};

    constructor (
        @Inject(ParameterValidator)
        private readonly validator: (component: PagingComponent) => ValidationResultInterface
    ) {}

    public get pagesCount(): number {
        return this.pageCount;
    }

    public get pages(): Page[] {
        return _.values(this.framePages);
    }

    public get showNextFrame(): boolean {
        return this.pageCount > this.frameSize && (this.page + this.frameSize) < this.pageCount;
    }

    public get showPreviousFrame(): boolean {
        return (this.page - this.frameSize) >= 0 && this.pageCount > this.frameSize;
    }

    public ngOnInit(): void {
        let result = this.validator(this);
        if (!result.valid) {
            throw new Error(result.messages.join(', '));
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        let totalChange = changes['total'];
        let pageChange = changes['page'];

        if (pageChange || totalChange) {
            if (totalChange.currentValue > 0) {
                this.framePages = this.createPages(this.currentFrame);
            }

            this.setPage(this.page);
        }
    }

    public changePage(number: number): void {
        this.pageChanged.emit(this.setPage(number).pageModel);
    }

    public nextFrame(): void {
        this.changePage(this.page + this.frameSize);
    }

    public previousFrame(): void {
        this.changePage(this.page - this.frameSize);
    }

    private computePageSize(total: number, itemsPerPage: number): number {
        return Math.ceil(total / itemsPerPage);
    }

    private createPages(currentFrame: number): FramePages {
        let result: FramePages = {};
        for(let i = 0; i < this.frameSize; i++) {

            let pageNumber = currentFrame * this.frameSize + i;

            if (pageNumber === this.pageCount) {
               break;
            }

            result[pageNumber] = new Page(pageNumber, this.itemsPerPage);
        }
        return result;
    }

    private setPage(pageNumber: number): Page {

        if (this.pageCount === 0) {
            return new Page(this.page, this.itemsPerPage, true);
        }

        let currentFrame = Math.floor(pageNumber / this.frameSize);

        if (pageNumber + 1 > this.pageCount) {
            currentFrame = Math.floor(this.pageCount / this.frameSize);
            pageNumber = this.pageCount - 1;
        }

        if (currentFrame !== this.currentFrame) {
            this.framePages = this.createPages(currentFrame);
        }

        this.currentFrame = currentFrame;
        let currentPage = this.framePages[pageNumber];
        if (currentPage) {
            for(let index in this.framePages) {
                this.framePages[index].active = false;
            }
            currentPage.active = true;
        }
        this.page = pageNumber;
        return currentPage;
    }
}

export class Page {

    public readonly label: string;

    constructor(public readonly number: number,
                public readonly size: number,
                public active: boolean = false) {
        this.label = (number + 1).toString();
    }

    public get pageModel(): PageModelInterface {
        return { skip: this.number * this.size, top: this.size, page: this.number };
    }
}


export interface PageModelInterface {
    skip: number;
    top: number;
    page: number;
}