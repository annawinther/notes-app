import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import Note from './Note';

const Notes = ({
  notes, deleteNote, updateNote, loading, errors, onAddingNote,
}) => (
  <div>
    <TopStyled>
      <H1>Your Notes</H1>
      <Button type="button" className="btn" onClick={() => onAddingNote()}>Add Note</Button>
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
// text-align: center;
`;
const Button = styled.button`
background-color: #FF8C00;
// border: 1px solid black;
text-align: left;
margin-bottom: 0.5rem;
// padding: 1rem;
color: white;
height: 2.5rem;
&:hover{
  background-color: #FFA500;
  border: 1px solid white;
  color: white;
}
`;
const TopStyled = styled.div`
    // background: red;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem
`;

export default Notes;
