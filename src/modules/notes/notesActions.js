import { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from '../../graphql/queries';
import { createNote, updateNote, deleteNote } from '../../graphql/mutations';

import * as types from './notesTypes';

export const fetchNotesAction = () => (dispatch) => {
  dispatch({ type: types.ON_FETCH_NOTES_START });

  return API.graphql(graphqlOperation(listNotes))
    .then(({ data }) => {
      dispatch({
        type: types.ON_FETCH_NOTES_SUCCESS,
        payload: data.listNotes.items,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ON_FETCH_NOTES_FAILURE,
        payload: err,
      });
    });
};

export const addNotesAction = (note, newNotes) => async (dispatch) => {
  dispatch({ type: types.ON_ADD_NOTE_START });

  await API.graphql(graphqlOperation(createNote, { input: note }))
    .then(() => {
      dispatch({
        type: types.ON_ADD_NOTE_SUCCESS,
        payload: newNotes,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ON_ADD_NOTE_FAILURE,
        payload: err.message,
      });
    });
};

export const deleteNoteAction = (input) => async (dispatch) => {
  dispatch({ type: types.ON_DELETE_NOTE_SUCCESS });
  try {
    await API.graphql(graphqlOperation(deleteNote, { input }));
  } catch (err) {
    dispatch({
      type: types.ON_DELETE_NOTE_FAILURE,
      payload: err.message,
    });
  }
};

export const updateNoteAction = (updatedNote, allNotes) => async (dispatch) => {
  dispatch({ type: types.ON_UPDATE_NOTE_START });

  await API.graphql(graphqlOperation(updateNote, { input: updatedNote }))
    .then(() => {
      dispatch({
        type: types.ON_UPDATE_NOTE_SUCCESS,
        payload: allNotes,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ON_UPDATE_NOTE_FAILURE,
        payload: err.message,
      });
    });
};
