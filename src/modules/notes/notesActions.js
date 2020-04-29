import { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from '../../graphql/queries';
import * as types from './notesTypes';

export const fetchNotes = () => (dispatch) => {
  dispatch({ type: types.ON_FETCH_NOTES_START });

  return API.graphql(graphqlOperation(listNotes))
    .then(({ data }) => {
      // console.log('res', data.listNotes.items);
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
