import * as types from './notesTypes';

const initialState = {
  notesArray: [],
  loading: false,
  isEditing: false,
  deletingNote: false,
  errors: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_FETCH_NOTES_START:
      return {
        ...state,
        loading: true,
      };
    case types.ON_FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notesArray: action.payload,
      };
    case types.ON_FETCH_NOTES_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case types.ON_ADD_NOTE_START:
      return {
        ...state,
        loading: true,
      };
    case types.ON_ADD_NOTE_SUCCESS:
      return {
        ...state,
        notesArray: action.payload,
      };
    case types.ON_ADD_NOTE_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case types.ON_DELETE_NOTE_START:
      return {
        ...state,
        loading: true,
      };
    case types.ON_DELETE_NOTE_SUCCESS:
      return {
        ...state,
        deletingNote: true,
        notesArray: state.notesArray.filter((note) => note.id !== action.payload.id),
      };
    case types.ON_DELETE_NOTE_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case types.ON_UPDATE_NOTE_START:
      return {
        ...state,
        loading: true,
        isEditing: true,
      };
    case types.ON_UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notesArray: state.notesArray.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } return note;
        }),
      };
    case types.ON_UPDATE_NOTE_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
