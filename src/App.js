import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { connect } from 'react-redux';
import Notes from './components/Notes';
import Form from './components/Form';
import { fetchNotes } from './modules/notes/notesActions';

import './App.css';

const initialState = { id: null, name: '', description: '' };

// eslint-disable-next-line no-shadow
const App = ({ notes, fetchNotes }) => {
  // console.log('notes', notes);
  const [formState, setFormState] = useState(initialState);
  // const [notesState, setNotes] = useState(initialNotes);
  // const [edit, setEdit] = useState(false);
  const { notesArray } = notes;

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onCreateNote = async () => {
    console.log('add')
    // if (!formState.name || !formState.description) return;
    // const note = { ...formState };
    // const newNotes = [note, ...notesState.notes];
    // setNotes({ notes: newNotes });
    // setFormState(initialState);
    // setEdit(false);
    // try {
    //   await API.graphql(graphqlOperation(createNote, { input: note }));
    // } catch (err) {
    //   // eslint-disable-next-line no-console
    //   console.log('error creating todo', err);
    // }
  };


  const onDeleteNote = async (note) => {
    console.log('delete');
    // const input = { id: note.id };
    // const data = notesState.notes.filter((n) => n.id !== note.id);
    // setNotes({ notes: data });
    // try {
    //   await API.graphql(graphqlOperation(deleteNote, { input }));
    // } catch (err) {
    //   // eslint-disable-next-line no-console
    //   console.log('error deleting note', err);
    // }
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
})(withAuthenticator(App));
