import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Note from './Note';

const Notes = ({
  notes, deleteNote, updateNote, loading, errors,
}) => (
  <div>
    <TopStyled>
      <H1>Your Notes</H1>
      <Link className="nav-link" to="/add">Add Note</Link>
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

const NotesContainerStyled = styled.div`
// // background: blue;
// display: flex;
// flex-direction: row;
// max-width: 100%;
// flex-wrap: wrap;
// justify-content: center;
`;

const H1 = styled.h1`
text-align: center;
`;

const TopStyled = styled.div`
    // background: red;
    display: flex;
    justify-content: space-between
`;

export default Notes;
