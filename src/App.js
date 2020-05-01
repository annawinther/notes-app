import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { connect } from 'react-redux';
import Notes from './components/Notes';
import Form from './components/Form';
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
  };

  return (
    <div className="App">
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={onCreateNote}
        handleSubmit={handleSubmit}
        edit={edit}
      />
      <Notes
        notes={notesArray}
        loading={isLoading}
        errors={errors}
        deleteNote={onDeleteNote}
        updateNote={onUpdateNote}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: state.notes,
});

export default connect(mapStateToProps, {
  fetchNotesAction,
  addNotesAction,
  deleteNoteAction,
  updateNoteAction,
})(withAuthenticator(App));
