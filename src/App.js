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
const initialNotes = { notes: [], filter: 'none' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [notesState, setNotes] = useState(initialNotes)
  // console.log('state', notesState)
  
  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  }


  useEffect(() => {
    fetchNotes()
  }, [])


  const fetchNotes = async () => {
    try {
      const { data: { listTodos: { items }}} = await API.graphql(graphqlOperation(listTodos))
      console.log('items', items)
      setNotes({ notes: items })
    } catch (err) {
      console.log('error fetching notes...', err)
    }
  }

  const createNote = async () => {
    if (!formState.name || !formState.description) return
    const note = { ...formState };
    console.log('note', note)
    
    const newNotes = [note, ...notesState.notes]
    console.log('newnote', newNotes)
    setNotes({ notes: newNotes, filter: 'new' })
    console.log(notesState.notes)
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
    console.log('notes after deleted', data)
    setNotes({ notes: data })
    try {
      await API.graphql(graphqlOperation(deleteTodo, { input }))
    } catch (err) {
      console.log('error deleting note', err);
    }
  }

  const updateNote = async note => {
    const updatedNote = {
      ...note,
      // status: note.status === 'new' ? 'completed' : 'new'
    }
    const index = notesState.notes.findIndex(i => i.id === note.id)
    const notes = [...notesState.notes]
    notes[index] = updatedNote
    setNotes({ notes })

    try {
      await API.graphql(graphqlOperation(updateTodo, {input: updatedNote }))
    } catch (err) {
      console.log('error updating note', err)
    }
  }
  // const updateFilter = filter => setNotes({notes, filter})

  // const { notes, filter } = notesState;

  // if (filter === 'completed') {
  //   const filteredNotes = notes.filter(n => n.filter === 'completed')
  //   // console.log('note f', filteredNotes);
  // }
  // if (filter === 'new') {
  //   // console.log('new note',notesState.notes)
  //   const filteredNotes = notes.filter(n => n.filter === 'new')
  //   // console.log('note', filteredNotes);
  // }

  return (
    <div className="App">
      {/* {console.log('hei', notesState)} */}
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={createNote}
        // handleKeyPress={handleKeyPress}
      />
      <Notes
        notes={notesState.notes}
        filter={notesState.filter}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
        {/* <div style={styles.bottomMenu}>
        <p
          onClick={() => updateFilter('none')}
          style={styles.menuItem}
        >All</p>
        <p
          onClick={() => updateFilter('completed')}
          style={styles.menuItem}
        >Completed</p>
        <p
          onClick={() => updateFilter('new')}
          style={styles.menuItem}
        >Pending</p>
      </div> */}
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