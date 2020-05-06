import React, { useState } from 'react';
import {
  ToggleIcon, DeleteIcon, EditIcon, ListItems, DescriptionStyled, TitleStyled,
} from '../styles';

const Note = ({
  note, deleteNote, updateNote,
}) => {
  const { name, description } = note;
  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
    setRotate(!rotate);
  };

  return (
    <ListItems className="list-group">
      <li
        className="list-group-item border-0 d-flex justify-content-between align-items-center"
        onClick={() => toggleOpen()}
      >
        <TitleStyled>
          <ToggleIcon
            rotate={rotate ? rotate.toString() : undefined}
            size={17}
          />
          {' '}
          {name}
          {' '}
          <EditIcon
            onClick={() => updateNote(note)}
            size={13}
          />
        </TitleStyled>

        <span className="badge badgebadge-pill">
          <DeleteIcon
            onClick={() => deleteNote(note)}
            size={15}
          />
        </span>
      </li>
      {open ? (
        <li className="list-group-item d-flex border-0">
          <DescriptionStyled>
            {description}
          </DescriptionStyled>
        </li>
      ) : null}
    </ListItems>
  );
};

export default Note;
