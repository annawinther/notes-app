import React, { useEffect, useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import Form from './components/Form';

import './App.css';

const initialState = { title: '', description: '' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [notes, setNotes] = useState([])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  useEffect(() => {
    console.log("hello")
  }, [])

  const createNote = async note => {
    const newNotes= [note, ...notes]
    setNotes(newNotes)
  }

  return (
    <div className="App">
      <p>Notes</p>
      <Form
        formState={formState}
        setInput={setInput}
        createNote={createNote}
      />
      <Notes
        notes={notes}
      />
    </div>
  );
}


export default App;