import { combineReducers } from 'redux';
import { routeDataReducer } from '../route/route-data-reducer';

export const layoutReducer = combineReducers({
    routeData: routeDataReducer
});
