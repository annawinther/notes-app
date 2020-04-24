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


  // if (notesState.filter === 'completed') {
  //   notesState.notes = notesState.notes.filter(n => n.status === 'completed')
  //   console.log('note', notesState.notes);
  // }
  // if (notesState.filter === 'new') {
  //   notesState.notes = notesState.notes.filter(n => n.status === 'new')
  //   console.log('note', notesState.notes);
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
      />
      <div>
        test
      </div>
    </div>
  );
}


export default withAuthenticator(App);