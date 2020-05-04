import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import Note from './Note';

const Notes = ({
  notes, deleteNote, updateNote, loading, errors, history,
}) => (
  <div>
    <TopStyled>
      <h1>Your Notes</h1>
      <Button type="button" className="btn" onClick={() => history.push('/form')}>Add Note</Button>
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
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Button = styled.button`
background-color: #FF8C00;
text-align: left;
// margin-bottom: 0.5rem;
color: white;
height: 2.5rem;
&:hover{
  background-color: #FFA500;
  border: 1px solid white;
  color: white;
}
`;
const TopStyled = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 2rem 0;
    padding-left: 2rem;
    padding-right: 2rem
`;

export default Notes;
