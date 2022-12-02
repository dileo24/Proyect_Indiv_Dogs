import { createStore, applyMiddleware, compose } from "redux";
/* import { composeWithDevTools } from 'redux-devtools-extension' */
import rootReducer from "../reducer";
import thunkMiddleware from 'redux-thunk'

/* export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
 */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store