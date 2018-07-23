import { combineReducers } from 'redux';
import { layoutReducer } from './layout/layout-reducer';
import { uiReducer } from './ui/ui-reducer';

export const rootReducer = combineReducers({
    layout: layoutReducer,
    ui: uiReducer
});
