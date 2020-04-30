import React from 'react';
import Note from './Note';

const Notes = ({
  notes, deleteNote, updateNote, loading, errors,
}) => (
  <div>
    {loading || errors ? <span> Loading your notes...</span> || <span>{errors}</span> : (
      notes.map((note, index) => (
        <Note
            // eslint-disable-next-line react/no-array-index-key
          key={index}
          note={note}
          deleteNote={deleteNote}
          updateNote={updateNote}
          loading={loading}
        />
      ))
    )}
  </div>
);
export default Notes;
