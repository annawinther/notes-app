import { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from '../../graphql/queries';
import { createNote, updateNote, deleteNote } from '../../graphql/mutations';

import * as types from './notesTypes';

export const fetchNotes = () => (dispatch) => {
  // console.log('fetching!!')
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

export const addNotes = (note, newNotes) => async (dispatch) => {
  dispatch({ type: types.ON_ADD_NOTE_START });

  await API.graphql(graphqlOperation(createNote, { input: note }))
    .then(() => {
      dispatch({
        type: types.ON_ADD_NOTE_SUCCESS,
        payload: newNotes,
      });
    })
    .catch((err) => {
      console.log('error adding note', err);
    });
};

export const deleteNoteAction = (input) => async (dispatch) => {
  console.log(input)
  dispatch({ type: types.ON_DELETE_NOTE_SUCCESS });

  await API.graphql(graphqlOperation(deleteNote, { input }))
    .then(() => {
      dispatch(fetchNotes);
    })
    .catch((err) => {
      dispatch({
        type: types.ON_DELETE_NOTE_FAILURE,
        payload: err.message,
      });
    });
};

export const updtaeNoteAction = (updatedNote, note) => async (dispatch) => {
  // console.log('updated note', updatedNote);
  dispatch({ type: types.ON_UPDATE_NOTE_START });

  await API.graphql(graphqlOperation(updateNote, { input: updatedNote }))
    .then(() => {
      dispatch({
        type: types.ON_UPDATE_NOTE_SUCCESS,
        payload: note,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ON_UPDATE_NOTE_FAILURE,
        payload: err.message,
      });
    });
};