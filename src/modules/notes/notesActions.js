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
  ON_FETCH_MORE_NOTES_SUCCESS,
} from './notesTypes';

export const fetchNotesAction = () => (dispatch) => {
  dispatch({ type: ON_FETCH_NOTES_START });

  return API.graphql(graphqlOperation(listNotes, { limit: 8 }))
    .then(({ data }) => {
      dispatch({
        type: ON_FETCH_NOTES_SUCCESS,
        payload: data.listNotes,
      });
    })
    .catch((err) => {
      dispatch({
        type: ON_FETCH_NOTES_FAILURE,
        payload: err,
      });
    });
};

export const fetchMoreNotes = (nextToken) => (dispatch) => {
  dispatch({ type: ON_FETCH_NOTES_START });
  return API.graphql(graphqlOperation(listNotes, { nextToken, limit: 3 }))
    .then(({ data }) => {
      dispatch({
        type: ON_FETCH_MORE_NOTES_SUCCESS,
        payload: data.listNotes,
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

  await API.graphql(graphqlOperation(createNote, { input: note }))
    .then(({ data }) => {
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
