import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';

const Note = ({ note, deleteNote, updateNote }) => {
  const { name, description } = note;

  return (
    <div>
      <SingleNoteStyled className="card m-3" style={{ width: '29rem' }}>
        {/* <div className="card-header">{name}</div> */}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
        <IconsStyled>
          <FaTimes
            onClick={() => deleteNote(note)}
            color="red"
            size={17}
          />
          <MdEdit
            onClick={() => updateNote(note)}
            color="black"
            size={17}
          />
        </IconsStyled>
      </SingleNoteStyled>
    </div>
  );
};
const SingleNoteStyled = styled.div`
  // background: red;
  display: flex;
  flex-direction: row;
`;

const IconsStyled = styled.div`
  // background: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;
export default Note;
