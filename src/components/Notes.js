import React from 'react';
import Loader from 'react-loader-spinner';
import { MdAdd } from 'react-icons/md';
import Note from './Note';
import {
  NotesContainerStyled, Button, TopStyled,
} from '../styles';

const Notes = ({
  notes, deleteNote, updateNote, loading, errors, history,
}) => (
  <div>
    <TopStyled>
      <h1>Your Notes</h1>
      <Button type="button" className="btn" onClick={() => history.push('/form')}>
        <MdAdd />
        {' '}
        Add Note
      </Button>
    </TopStyled>
    <NotesContainerStyled>
      {loading || errors ? <Loader
        type="ThreeDots"
        color="black"
        height={50}
        width={50}
        timeout={3000}
      /> || <span>{errors}</span> : (
        notes.reverse().map((note, index) => (
          <Note
              // eslint-disable-next-line react/no-array-index-key
            key={index}
            note={note}
            index={index}
            deleteNote={deleteNote}
            updateNote={updateNote}
            loading={loading}
          />
        ))
      )}
    </NotesContainerStyled>
  </div>
);

export default Notes;
