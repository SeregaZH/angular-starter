import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { Store } from './store';
import { RouteDataActionCreator } from './route/route-data-action-creator';
import { UiActionCreator } from './ui/ui-action-creator';

@NgModule(
    {
        imports: [NgReduxModule, NgReduxModule],
        providers: [
            RouteDataActionCreator,
            UiActionCreator,
            Store
        ]
    })

export class SharedStateModule { }
