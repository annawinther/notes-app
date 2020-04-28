import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import Notes from './components/Notes';
import Form from './components/Form';
import { listNotes } from './graphql/queries';
import { createNote, updateNote, deleteNote } from './graphql/mutations';

import './App.css';


const initialState = { name: '', description: '' };
const initialNotes = { notes: [] };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [notesState, setNotes] = useState(initialNotes);

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const fetchNotes = async () => {
    try {
      const { data: { listNotes: { items } } } = await API.graphql(graphqlOperation(listNotes));
      setNotes({ notes: items });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error fetching notes...', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onCreateNote = async () => {
    if (!formState.name || !formState.description) return;
    const note = { ...formState };
    // const newNotes = [note, ...notesState.notes]
    // setNotes({ notes: newNotes })
    setFormState(initialState);
    try {
      await API.graphql(graphqlOperation(createNote, { input: note }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error creating todo', err);
    }
  };


  const onDeleteNote = async (note) => {
    const input = { id: note.id };
    const data = notesState.notes.filter((n) => n.id !== note.id);
    setNotes({ notes: data });
    try {
      await API.graphql(graphqlOperation(deleteNote, { input }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error deleting note', err);
    }
  };

  const onUpdateNote = async (note) => {
    const updatedNote = {
      ...note,
    };
    // console.log(updatedNote);
    // const index = notesState.notes.findIndex(i => i.id === note.id)
    // const notes = [...notesState.notes]
    // notes[index] = updatedNote
    const data = notesState.notes.filter((n) => n.id === updatedNote.id);
    // console.log('data', data[0]);
    setFormState(updatedNote);
    // setNotes({ notes })

    try {
      await API.graphql(graphqlOperation(updateNote, { input: data[0] }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error updating note', err);
    }
  };

  return (
    <div className="App">
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={onCreateNote}
      />
      <Notes
        notes={notesState.notes}
        deleteNote={onDeleteNote}
        updateNote={onUpdateNote}
      />
    </div>
  );
};

export default withAuthenticator(App);
