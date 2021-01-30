import { applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {rootReducer} from './reducers';

// [Для работы Redux Devtool]
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose //;
        | typeof Object;
    }
}
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
        compose
;
// [/Для работы Redux Devtool]

const initialState = {};

const middlewares = [thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = composeEnhancers(...enhancers)

export const store = createStore(rootReducer, initialState, composedEnhancers);