import React from 'react';
import Note from './Note';

const Notes = (props) => {
  const { notes, deleteNote, updateNote } = props;
  return (
    <div>
      {
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))
       }
    </div>
  );
};

export default Notes;
