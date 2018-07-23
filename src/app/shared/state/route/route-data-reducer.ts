import { Data } from '@angular/router';
import { RouteDataActions } from './route-data-actions';

/**
 * Route data reducer.
 * @param state Previous state of route data
 * @param action Dispatched action.
 * @return next state of route data.
 */
export function routeDataReducer(state = {}, action: any): Data {
    switch (action.type) {
        case RouteDataActions.ROUTE_DATA_CHANGED:
            return action.payload;
        default:
            return state;
    }
}
