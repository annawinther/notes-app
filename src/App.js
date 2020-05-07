import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { connect, useDispatch } from 'react-redux';
import Notes from './components/Notes';
import Form from './components/Form';
import Naviagtion from './components/Navigation';
import { AppContainerStyled, Button, LoadButtonDiv } from './styles';
import {
  fetchNotesAction, addNotesAction, deleteNoteAction, updateNoteAction, fetchMoreNotes, fillInForm,
} from './modules/notes/notesActions';
import { ON_CANCEL_ACTION, ON_UPDATE_NOTE_START } from './modules/notes/notesTypes';

import './App.css';

const App = ({
  // eslint-disable-next-line no-shadow
  notes, fetchNotesAction, addNotesAction, deleteNoteAction, updateNoteAction,
  // eslint-disable-next-line no-shadow
  fetchMoreNotes, fillInForm,
}) => {
  const {
    notesArray, isLoading, isEditing, errors, nextToken, form, isSaving,
  } = notes;
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(form);

  const setInput = (key, value) => {
    fillInForm({ ...form, [key]: value }, isSaving);
  };

  useEffect(() => {
    fetchNotesAction();
  }, [fetchNotesAction]);

  const onCancel = () => {
    dispatch({ type: ON_CANCEL_ACTION });
    history.push('/');
  };

  const onLoadmoreNotes = (token) => {
    fetchMoreNotes(token);
  };

  const onCreateNote = () => {
    if (!form.name || !form.description) return;
    const note = { ...form };
    addNotesAction(note);
    history.push('/');
  };

  const onDeleteNote = (note) => {
    const input = { id: note.id };
    deleteNoteAction(input);
  };

  const onUpdateNote = (note) => {
    dispatch({ type: ON_UPDATE_NOTE_START });

    const updatedNote = {
      id: note.id,
      ...note,
    };
    fillInForm(updatedNote);
    history.push('/form');
  };

  const handleSubmit = async (note) => {
    const updatedNote = {
      id: note.id,
      name: note.name,
      description: note.description,
    };
    updateNoteAction(updatedNote);
    history.push('/');
  };

  return (
    <AppContainerStyled>
      <Naviagtion />
      <Switch>
        <Route path="/form">
          <Form
            formState={form}
            setInput={setInput}
            createNote={onCreateNote}
            handleSubmit={handleSubmit}
            onCancel={onCancel}
            edit={isEditing}
          />
        </Route>
        <Route exact path="/">
          <Notes
            notes={notesArray}
            loading={isLoading}
            errors={errors}
            deleteNote={onDeleteNote}
            updateNote={onUpdateNote}
            history={history}
          />
          {' '}
          { nextToken === null ? ''
            : (
              <LoadButtonDiv>
                <Button type="button" className="btn" onClick={() => onLoadmoreNotes(nextToken)}>Load more</Button>
              </LoadButtonDiv>
            )}
        </Route>
      </Switch>
    </AppContainerStyled>
  );
};

const mapStateToProps = (state) => ({
  notes: state.notes,
});

export default withAuthenticator(connect(mapStateToProps, {
  fetchNotesAction,
  addNotesAction,
  deleteNoteAction,
  updateNoteAction,
  fetchMoreNotes,
  fillInForm,
})(App));
