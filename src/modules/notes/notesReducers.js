import * as types from './notesTypes';

const initialState = {
  count: 0,
  notesArray: [],
  loading: false,
  errors: null,
};

const countReducer = (state = initialState, action) => {
  console.log('test', state, action.payload);
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case types.ON_FETCH_NOTES_START:
      return {
        ...state,
        loading: true,
        // notesArray: [{ name: 'yo', description: 'test' }],
      };
    case types.ON_FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notesArray: action.payload,
      };
    case types.ON_FETCH_NOTES_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default countReducer;
