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
  const { notesArray } = notes;

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  useEffect(() => {
    fetchNotesAction();
  }, []);

  const onCreateNote = async () => {
    if (!formState.name || !formState.description) return;
    const note = { ...formState };
    const newNotes = [note, ...notesArray];
    setFormState(initialState);
    addNotesAction(note, newNotes);
    fetchNotesAction();
  };

  const onDeleteNote = (note) => {
    const input = { id: note.id };
    deleteNoteAction(input);
    fetchNotesAction();
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
    const index = notesArray.findIndex((i) => i.id === note.id);
    const allNotes = [...notesArray];
    allNotes[index] = updatedNote;
    setFormState(initialState);
    setEdit(false);
    updateNoteAction(updatedNote, allNotes);
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
