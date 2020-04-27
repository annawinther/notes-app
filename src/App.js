import React, { useEffect, useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import Form from './components/Form';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listNotes } from './graphql/queries';
import { createNote, updateNote, deleteNote } from './graphql/mutations';

import './App.css';



const initialState = { title: '', description: '' };
const initialNotes = { notes: [], filter: 'none' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [notesState, setNotes] = useState(initialNotes)
  // console.log('state', notesState)
  
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }


  useEffect(() => {
    fetchNotes()
  }, [])


  async function fetchNotes(){
    try {
      const todoData = await API.graphql(graphqlOperation(listNotes))
      const todos = todoData.data.listTodods.items
      setNotes(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  const createNote = () => {
    if (formState.title === '') {
      alert("you cannot enter empty title")
      return
    }
    const note = { ...formState };
    const newNotes = [note, ...notesState.notes]
    // console.log('newnote', newNotes)
    setNotes({notes: newNotes, filter: 'new'})
    setFormState(initialState);
  }

  // console.log('1234', notesState.notes)

  const deleteNote = async (note) => {
    // console.log('delete', note)
    const input = { id: note.id}
    // console.log('if', input)
    // console.log('yo', notesState.notes.id)
    const data = notesState.notes.filter(n => n.title !== note.title);
    // console.log('notes after deleted', data)
    setNotes({notes: data, filter})
  }

  const updateNote = async note => {
    console.log('test', note)
    const updatedNote = {
      ...note,
      filter: filter === 'new' ? 'completed' : 'new'
    }
    console.log('test1', note.id)

    const index = notesState.notes.findIndex(i => i.id === note.id)
    console.log('idx', index)
    // const notes = [...notesState.notes]
    // notes[index] = updatedNote
    // setNotes({notes})
  }
  const updateFilter = filter => setNotes({notes, filter})

  const { notes, filter } = notesState;

  if (filter === 'completed') {
    const filteredNotes = notes.filter(n => n.filter === 'completed')
    console.log('note f', filteredNotes);
  }
  if (filter === 'new') {
    // console.log('new note',notesState.notes)
    const filteredNotes = notes.filter(n => n.filter === 'new')
    console.log('note', filteredNotes);
  }

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
        <div style={styles.bottomMenu}>
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
      </div>
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