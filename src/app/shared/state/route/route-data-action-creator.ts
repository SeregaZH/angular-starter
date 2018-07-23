import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { RouteDataActions } from './route-data-actions';

/**
 * Creates actions for route data
 */
@Injectable()
export class RouteDataActionCreator {
    /**
     * Creates data changed action after route data has been changed
     * @param route
     */
    public dataChanged(routeData: Data): any {
        return {
            payload: routeData,
            type: RouteDataActions.ROUTE_DATA_CHANGED
        };
    }
}
