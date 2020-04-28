import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const Note = ({ note, deleteNote, updateNote }) => {
  const { name, description } = note;

  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <div>
        <FaTimes
          onClick={() => deleteNote(note)}
          color="red"
          size={22}
        />
        <MdEdit
          onClick={() => updateNote(note)}
          size={22}
          color="black"
        />
      </div>
    </div>
  );
};

export default Note;
