import {compose, createStore as createReduxStore, applyMiddleware, Reducer, Action} from 'redux';
import createSagaMiddleware from 'redux-saga';

export default function createStore(rootReducer: Reducer<any, Action<any>>, rootSaga: any, ...middleware: any[]) {
    const sagaMiddleware = createSagaMiddleware();
    const windowCompose = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = process.env.NODE_ENV !== 'production' && windowCompose ?
        windowCompose : compose;

    const store = createReduxStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, ...middleware)));
    sagaMiddleware.run(rootSaga, store);

    return store;
}
