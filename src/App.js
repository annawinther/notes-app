import React, { useEffect, useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import Form from './components/Form';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodos } from './graphql/queries';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';

import './App.css';


const initialState = { name: '', description: '' };
const initialNotes = { notes: [] };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [notesState, setNotes] = useState(initialNotes)
  
  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  }


  useEffect(() => {
    fetchNotes()
  }, [])


  const fetchNotes = async () => {
    try {
      const { data: { listTodos: { items }}} = await API.graphql(graphqlOperation(listTodos))
      setNotes({ notes: items })
    } catch (err) {
      console.log('error fetching notes...', err)
    }
  }

  const createNote = async () => {
    if (!formState.name || !formState.description) return
    const note = { ...formState };
    
    const newNotes = [note, ...notesState.notes]
    setNotes({ notes: newNotes })
    setFormState(initialState);
    try {
      await API.graphql(graphqlOperation(createTodo, { input: note }))
    } catch (err) {
      console.log('error creating todo', err)
    }
    
  }


  const deleteNote = async (note) => {
    const input = { id: note.id}
    const data = notesState.notes.filter(n => n.id !== note.id);
    setNotes({ notes: data })
    try {
      await API.graphql(graphqlOperation(deleteTodo, { input }))
    } catch (err) {
      console.log('error deleting note', err);
    }
  }

  const updateNote = async (note) => {    
    const updatedNote = {
      ...note,
    }
    const index = notesState.notes.findIndex(i => i.id === note.id)
    const notes = [...notesState.notes]
    
    notes[index] = updatedNote
    setFormState(updatedNote)
    setNotes({ notes })

    // const input = { id: note.id}
    // const data = notesState.notes.filter(n => n.id !== note.id);
    // console.log('notes after deleted', data)

    try {
       deleteNote(note)
    } catch (err) {
      console.log('error updating note', err)
    }
  }

  return (
    <div className="App">
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={createNote}
        // handleKeyPress={handleKeyPress}
      />
      <Notes
        notes={notesState.notes}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
    </div>
  );
}

const styles = {
  container: {
    width: 360,
    margin: '0 auto',
    borderBottom: '1px solid #ededed',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 35,
    width: '360px',
    border: 'none',
    outline: 'none',
    marginLeft: 10,
    fontSize: 20,
    padding: 8,
  }
}

export default withAuthenticator(App);