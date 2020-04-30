import React from 'react';
import Loader from 'react-loader-spinner';
import Note from './Note';

const Notes = ({
  notes, deleteNote, updateNote, loading, errors,
}) => (
  <div>
    <h1>Your Notes</h1>
    {loading || errors ? <Loader
      type="ThreeDots"
      color="black"
      height={50}
      width={50}
      timeout={3000}
    /> || <span>{errors}</span> : (
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
