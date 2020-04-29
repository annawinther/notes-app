import React from 'react';
import Note from './Note';

const Notes = ({ notes, deleteNote, updateNote }) => (
  <div>
    {console.log('notes', notes)}
    {
        notes.map((note, index) => (
          <Note
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))
       }
  </div>
);
export default Notes;
