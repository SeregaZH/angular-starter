import { Injectable } from '@angular/core';
import {
    Action, AnyAction, Dispatch, Middleware, Reducer, StoreEnhancer, Unsubscribe
} from 'redux';
import { Comparator, NgRedux, ObservableStore, Selector } from '@angular-redux/store';
import { Observable } from 'rxjs';

/**
 * Adapter for ngRedux to extend basic behaviour of ngRedux
 */
@Injectable()
export class Store<TAppState> extends NgRedux<TAppState> {

    /**
     * Creates an instance of Store
     * @param ngZone Zone adapter for the angular.
     * @constructor
     */
    constructor(private ngRedux: NgRedux<TAppState>) {
        super();
    }

    public configureStore: (
        rootReducer: Reducer<TAppState, AnyAction>,
        initState: TAppState, middleware?: Middleware<{}, any, Dispatch<AnyAction>>[],
        enhancers?: StoreEnhancer<TAppState, {}>[]) => void =
                                            (rootReducer, initState, middleware, enchasers) => {
        this.ngRedux.configureStore(rootReducer, initState, middleware, enchasers);
    };

    public provideStore: (store: Store<TAppState>) => void = (store) => {
        return this.ngRedux.provideStore(store);
    };

    public dispatch: (action: AnyAction) => any = (action: AnyAction) => {
        return this.ngRedux.dispatch(action);
    };

    public getState: () => TAppState = () => {
        return this.ngRedux.getState();
    };

    public subscribe: (listener: () => void) => Unsubscribe = (l) => {
        return this.ngRedux.subscribe(l);
    };

    public replaceReducer: (nextReducer: Reducer<TAppState>) => void = (n) => {
        return this.ngRedux.replaceReducer(n);
    };

    public select: <SelectedType>(
        selector?: Selector<TAppState, SelectedType>,
        comparator?: Comparator
    ) => Observable<SelectedType> = (s, c) => {
        return this.ngRedux.select( s, c);
    };

    public configureSubStore: <SubState>(
        basePath: (string | number)[], localReducer: Reducer<SubState, AnyAction>
    ) => ObservableStore<SubState> = (b, l) => {
        return this.configureSubStore(b, l);
    };

    /**
     * Dispatches asynchronous action.
     * @param asyncAction asynchronous action to dispatch.
     * @return action result promise.
     */
    public dispatchAsync<T>(asyncAction: (dispatch: <A extends Action>(action: A) => any) => Promise<T>): Promise<T> {
        return this.dispatch(asyncAction as any) as any;
    };
}
