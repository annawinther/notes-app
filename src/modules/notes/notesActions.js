import { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from '../../graphql/queries';
import { createNote, updateNote, deleteNote } from '../../graphql/mutations';
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
  // ON_TYPE_FORM_SUCCESS,
  // ON_TYPE_FORM_FAILURE,
} from './notesTypes';

export const fetchNotesAction = () => (dispatch) => {
  dispatch({ type: ON_FETCH_NOTES_START });

  return API.graphql(graphqlOperation(listNotes))
    .then(({ data }) => {
      dispatch({
        type: ON_FETCH_NOTES_SUCCESS,
        payload: data.listNotes.items,
      });
    })
    .catch((err) => {
      dispatch({
        type: ON_FETCH_NOTES_FAILURE,
        payload: err,
      });
    });
};

export const addNotesAction = (note) => async (dispatch) => {
  dispatch({ type: ON_ADD_NOTE_START });
  dispatch({ type: ON_TYPE_FORM_START });

  await API.graphql(graphqlOperation(createNote, { input: note }))
    .then(({ data }) => {
      console.log(data)
      dispatch({
        type: ON_ADD_NOTE_SUCCESS,
        payload: data.createNote,
      });
    })
    .catch((err) => {
      dispatch({
        type: ON_ADD_NOTE_FAILURE,
        payload: err.message,
      });
    });
};

export const deleteNoteAction = (input) => async (dispatch) => {
  dispatch({ type: ON_DELETE_NOTE_START });

  await API.graphql(graphqlOperation(deleteNote, { input }))
    .then(({ data }) => {
      dispatch({
        type: ON_DELETE_NOTE_SUCCESS,
        payload: data.deleteNote,
      });
    })
    .catch((err) => {
      dispatch({
        type: ON_DELETE_NOTE_FAILURE,
        payload: err.message,
      });
    });
};

export const updateNoteAction = (updatedNote) => async (dispatch) => {
  dispatch({ type: ON_UPDATE_NOTE_START });

  await API.graphql(graphqlOperation(updateNote, { input: updatedNote }))
    .then(({ data }) => {
      dispatch({
        type: ON_UPDATE_NOTE_SUCCESS,
        payload: data.updateNote,
      });
    })
    .catch((err) => {
      dispatch({
        type: ON_UPDATE_NOTE_FAILURE,
        payload: err.message,
      });
    });
};

export const fillInForm = (data) => ({
  type: ON_TYPE_FORM_START,
  payload: data,
});
