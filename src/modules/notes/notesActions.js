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

export const addNotes = (note) => async (dispatch) => {
  dispatch({ type: types.ON_ADD_NOTE_START });

  await API.graphql(graphqlOperation(createNote, { input: note }))
    .then(({ data }) => {
      dispatch({
        type: types.ON_ADD_NOTE_SUCCESS,
        payload: data.createNote,
      });
    })
    .catch((err) => {
      console.log('error adding note', err);
    });
};

export const deleteNoteAction = (input) => async (dispatch) => {
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
