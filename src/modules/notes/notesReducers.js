import {
  ON_FETCH_NOTES_START,
  ON_FETCH_NOTES_SUCCESS,
  ON_FETCH_NOTES_FAILURE,
  ON_ADD_NOTE_START,
  ON_ADD_NOTE_SUCCESS,
  ON_ADD_NOTE_FAILURE,
  ON_DELETE_NOTE_START,
  ON_DELETE_NOTE_SUCCESS,
  ON_DELETE_NOTE_FAILURE,
  ON_UPDATE_NOTE_START,
  ON_UPDATE_NOTE_SUCCESS,
  ON_UPDATE_NOTE_FAILURE,
  ON_TYPE_FORM_START,
  ON_TYPE_FORM_SUCCESS,
  ON_TYPE_FORM_FAILURE,
  ON_FETCH_MORE_NOTES_SUCCESS,
  ON_CANCEL_ACTION,
} from './notesTypes';

const initialState = {
  notesArray: [],
  isLoading: false,
  isEditing: false,
  errors: null,
  form: { id: null, name: '', description: '' },
  nextToken: null,
  isSaving: false,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_FETCH_NOTES_START:
      return {
        ...state,
        isLoading: true,
      };
    case ON_FETCH_NOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notesArray: action.payload.items,
        nextToken: action.payload.nextToken,
      };
    case ON_FETCH_NOTES_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case ON_FETCH_MORE_NOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notesArray: state.notesArray.concat(action.payload.items),
        nextToken: action.payload.nextToken,
      };
    case ON_ADD_NOTE_START:
      return {
        ...state,
        isLoading: true,
      };
    case ON_ADD_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notesArray: state.notesArray.concat(action.payload),
      };
    case ON_ADD_NOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case ON_DELETE_NOTE_START:
      return {
        ...state,
        isLoading: true,
      };
    case ON_DELETE_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notesArray: state.notesArray.filter((note) => note.id !== action.payload.id),
      };
    case ON_DELETE_NOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case ON_UPDATE_NOTE_START:
      return {
        ...state,
        isLoading: true,
        isEditing: true,
        form: state.form,
      };
    case ON_UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        notesArray: state.notesArray.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } return note;
        }),
      };
    case ON_UPDATE_NOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        errors: action.payload,
      };
    case ON_TYPE_FORM_START:
      return {
        ...state,
        isSaving: false,
        form: {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
        },
      };
    case ON_TYPE_FORM_SUCCESS:
      return {
        ...state,
        isSaving: true,
        form: { id: null, name: '', description: '' },
      };
    case ON_TYPE_FORM_FAILURE:
      return {
        ...state,
        isSaving: false,
        errors: action.payload,
      };
    case ON_CANCEL_ACTION:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        form: { id: null, name: '', description: '' },
      };
    default:
      return state;
  }
};

export default noteReducer;
