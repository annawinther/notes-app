import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import noteReducer from '../modules/notes/notesReducers';

const rootReducer = combineReducers({
  notes: noteReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
