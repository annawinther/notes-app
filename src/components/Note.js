import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdEdit, MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';

const Note = ({
  note, deleteNote, updateNote,
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
      <ListItems
        className="list-group-item border-bottom-0 d-flex justify-content-between align-items-center"
        onClick={() => toggleOpen()}
      >
        <span>
          <MdKeyboardArrowDown />
          {' '}
          {name}
          {' '}
          <MdEdits
            onClick={() => updateNote(note)}
            size={17}
          />
        </span>

        <span className="badge badgebadge-pill">
          <FaTimes
            onClick={() => deleteNote(note)}
            color="black"
            size={17}
          />
        </span>
      </ListItems>
      {open ? (
        <li className="list-group-item d-flex align-items-center">
          <p>
            {description}
          </p>
        </li>
      ) : null}
    </ul>
  );
};

export default Note;

const ListItems = styled.li`
    // background: red;  
    //   .list-group-items:last-child{
    //     // background: blue;
    //     border: 1px solid red
    //   }
`;

const MdEdits = styled(MdEdit)`
  color: black;
  margin-left: 5px;
`;
