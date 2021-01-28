import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer,{ mantenerUserState } from './userDuck';
import postReducer from './postDuck'

const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    mantenerUserState()(store.dispatch)
    return store;
}