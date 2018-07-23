import { Action } from 'redux';
import { UiActions } from './ui-actions';
import { Injectable } from '@angular/core';

@Injectable()
export class UiActionCreator {
    public toggleCounter(counterState: boolean): Action {
        return { payload: counterState, type: UiActions.TOGGLE_COUNTER } as Action;
    }
}
