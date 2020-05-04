import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdEdit, MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';

const Note = ({
  note, deleteNote, updateNote,
}) => {
  const { name, description } = note;
  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const rotateClick = () => {
    if (rotate) {
      setRotate(false);
    } else {
      setRotate(true);
    }
  };

  return (
    <ListItems className="list-group">
      <li
        className="list-group-item border-0 d-flex justify-content-between align-items-center"
        onClick={() => { toggleOpen(); rotateClick(); }}
      >
        <span>
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
        </span>

        <span className="badge badgebadge-pill">
          <DeleteIcon
            onClick={() => deleteNote(note)}
            size={15}
          />
        </span>
      </li>
      {open ? (
        <li className="list-group-item d-flex border-0">
          <p>
            {description}
          </p>
        </li>
      ) : null}
    </ListItems>
  );
};

export default Note;

const ListItems = styled.ul`
    border-bottom: 1px solid black;
    // &:nth-child(1){ 
    //   // color: red;
    //   border-top: 1px solid black;
    // }
`;

const EditIcon = styled(MdEdit)`
  color: black;
  margin-left: 0.3rem;
  &:hover{
    cursor: pointer;
  }
`;

const DeleteIcon = styled(FaTimes)`
  color: black;
  &:hover{
    cursor: pointer;
  }
`;

const ToggleIcon = styled(MdKeyboardArrowDown)`
  color: black;
  margin-right: 0.5rem;
  transform: ${(props) => (props.rotate ? 'rotate(180deg)' : '')};
  &:hover{
    cursor: pointer;
  }
`;
