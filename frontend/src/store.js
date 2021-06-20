import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createBrowserHistory} from "history";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects'
import {routerMiddleware} from "connected-react-router";
import createRootReducer, {sagas} from "./reducer";
import {promiseMiddleware, localStorageMiddleware} from './middleware';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all(sagas);
}

export const history = createBrowserHistory({basename: '/'});

export function configureStore(preloadedState) {
    const composeEnhancer = compose || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancer(
            applyMiddleware(...[
                    routerMiddleware(history),
                    sagaMiddleware,
                    promiseMiddleware,
                    localStorageMiddleware,
                    ...(process.env.NODE_ENV !== 'production' ? [createLogger()] : []),
                ]
            ),
        ),
    );

    // then run the saga
    sagaMiddleware.run(rootSaga);

    // Hot reloading
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./reducer", () => {
            store.replaceReducer(createRootReducer(history));
        });
    }
    return store;
}

const store = configureStore();
export default store;