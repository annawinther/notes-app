import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Notes from './components/Notes';
import Form from './components/Form';
import Naviagtion from './components/Navigation';
import {
  fetchNotesAction, addNotesAction, deleteNoteAction, updateNoteAction,
} from './modules/notes/notesActions';

import './App.css';

const initialState = { id: null, name: '', description: '' };

const App = ({
  // eslint-disable-next-line no-shadow
  notes, fetchNotesAction, addNotesAction, deleteNoteAction, updateNoteAction,
}) => {
  const [formState, setFormState] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const { notesArray, isLoading, errors } = notes;
  const history = useHistory();

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  useEffect(() => {
    fetchNotesAction();
  }, [fetchNotesAction]);

  const onCreateNote = async () => {
    if (!formState.name || !formState.description) return;
    const note = { ...formState };
    setFormState(initialState);
    addNotesAction(note);
    history.push('/');
  };

  const onDeleteNote = (note) => {
    const input = { id: note.id };
    deleteNoteAction(input);
  };

  const onUpdateNote = (note) => {
    setEdit(true);
    const updatedNote = {
      id: note.id,
      ...note,
    };
    setFormState(updatedNote);
    history.push('/add');
  };

  const handleSubmit = async (note) => {
    const updatedNote = {
      id: note.id,
      name: note.name,
      description: note.description,
    };
    setFormState(initialState);
    setEdit(false);
    updateNoteAction(updatedNote);
    history.push('/');
  };

  return (
    <AppContainerStyled>
      <Naviagtion />
      <Switch>
        <Route path="/add">
          <Form
            formState={formState}
            setInput={setInput}
            createNote={onCreateNote}
            handleSubmit={handleSubmit}
            edit={edit}
          />
        </Route>
        <Route exact path="/">
          <Notes
            notes={notesArray}
            loading={isLoading}
            errors={errors}
            deleteNote={onDeleteNote}
            updateNote={onUpdateNote}
          />
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
})(App));

const AppContainerStyled = styled.div`
  // background: red;
  justify-content: center;
  // display: flex;
  // flex-direction: row;
`;
