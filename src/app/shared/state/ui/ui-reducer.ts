import { UiStateInterface } from './ui-state-interface';
import { UiActions } from './ui-actions';

export function uiReducer(state = {} as UiStateInterface, action: any): UiStateInterface {
    switch (action.type) {
        case UiActions.TOGGLE_COUNTER: return { ...state, showCounter: action.payload };
        default: return state;
    }
}
