import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
// import { API, graphqlOperation } from 'aws-amplify';
import { connect } from 'react-redux';
import Notes from './components/Notes';
import Form from './components/Form';
import { fetchNotes, addNotes, deleteNoteAction } from './modules/notes/notesActions';

import './App.css';

const initialState = { id: null, name: '', description: '' };
// const initialNotes = {notes: []}
// eslint-disable-next-line no-shadow
const App = ({ notes, fetchNotes, addNotes, deleteNoteAction }) => {
  // console.log('notes', notes);
  const [formState, setFormState] = useState(initialState);
  // const [notesState, setNotes] = useState(initialNotes);
  // const [edit, setEdit] = useState(false);
  const { notesArray, addedNotes } = notes;

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onCreateNote = async () => {
    if (!formState.name || !formState.description) return;
    const note = { ...formState };
    setFormState(initialState);
    addNotes(note);
    fetchNotes();
  };


  const onDeleteNote = (note) => {
    const input = { id: note.id };
    deleteNoteAction(input);
    fetchNotes();
  };

  const onUpdateNote = (note) => {
    console.log('edit');
    // setEdit(true);
    // const updatedNote = {
    //   id: note.id,
    //   ...note,
    // };
    // setFormState(updatedNote);
  };

  const handleSubmit = async (note) => {
    // const updatedNote = {
      console.log('submit edit')
    //   id: note.id,
    //   name: note.name,
    //   description: note.description,
    // };
    // const index = notesState.notes.findIndex((i) => i.id === note.id);
    // const notes = [...notesState.notes];
    // notes[index] = updatedNote;
    // setNotes({ notes });
    // setFormState(initialState);
    // setEdit(false);

    // try {
    //   await API.graphql(graphqlOperation(updateNote, { input: updatedNote }));
    // } catch (err) {
    //   // eslint-disable-next-line no-console
    //   console.log('error updating note', err);
    // }
  };

  return (
    <div className="App">
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={onCreateNote}
        handleSubmit={handleSubmit}
        // edit={edit}
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
  fetchNotes,
  addNotes,
  deleteNoteAction,
})(withAuthenticator(App));
