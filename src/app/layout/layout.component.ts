import { Component, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/skipUntil';

@Component({
    selector: 'vd-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {}