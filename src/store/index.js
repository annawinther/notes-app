import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../modules/notes/notesReducers';

const rootReducer = combineReducers({
  count: countReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
