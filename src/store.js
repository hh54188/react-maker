import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, { counter: 0 },  applyMiddleware(thunk));
export default store;