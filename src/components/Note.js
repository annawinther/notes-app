import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';

const Note = ({ note, deleteNote, updateNote }) => {
  const { name, description } = note;

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {name}
        <span className="badge badgebadge-pill">
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
        </span>
      </li>
      {/* <li className="list-group-item">{description}</li> */}
    </ul>
  );
};

export default Note;
