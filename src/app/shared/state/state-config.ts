import { NgRedux } from '@angular-redux/store';
import { rootReducer } from './root-reducer';
import { RootStateInterface } from './root-state-interface';

// todo uncomment it when typings will be ready
// import { thunk } from 'redux-thunk';
// tslint:disable:no-var-requires
const thunk: any = require('redux-thunk').default;

export function configureState<
    TStore extends NgRedux<RootStateInterface>
    >(store: TStore, initialState = {}): TStore {
    store.configureStore(rootReducer, initialState, [thunk]);
    return store;
}
