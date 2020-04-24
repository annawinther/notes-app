import React, { useEffect, useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import Form from './components/Form';
import { withAuthenticator } from 'aws-amplify-react';
// import uuid from 'uuid';
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
    console.log("hello")
  }, [])

  const createNote = () => {
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
    setNotes({notes: data})
  }

  const updateNote = async note => {
    const updatedNote = {
      ...note,
      status: note.status === 'new' ? 'completed' : 'new'
    }
    const index = notesState.notes.findIndex(i => i.id === note.id)
    console.log('idx', index)
    const notes = [...notesState.notes]
    notes[index] = updatedNote
    setNotes({notes})
  }
  const updateFilter = filter => setNotes({notes, filter: filter})
  const { notes, filter } = notesState;

  //   if (filter === 'completed') {
  //     notesState.notes = notesState.notes.filter(n => n.status === 'completed')
  //   // console.log('note f', filterNotes);
  // }
  // if (filter === 'new') {
  //   notesState.notes = notesState.notes.filter(n => n.status === 'new')
  //   // console.log('note', filterNotes);
  // }

  return (
    <div className="App">
      {/* {console.log('hei', notesState)} */}
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={createNote}
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