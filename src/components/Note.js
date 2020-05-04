import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';

const Note = ({
  note, deleteNote, updateNote
}) => {
  const { name, description } = note;
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <ul className="list-group">
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        onClick={() => toggleOpen()}
      >
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
      {open ? (<div>{description}</div>) : null}
      {/* <li className="list-group-item">{description}</li> */}
    </ul>
  );
};

export default Note;
