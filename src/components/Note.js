import React from 'react';
import { FaTimes } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md';

const Note = (props) => {
  const { name, description } = props.note;

    return (
      <div style={styles.container}>
        <p>{name}</p>
        <p style={styles.name}>{description}</p>
        <div style={styles.iconContainer}>
          <FaTimes
            onClick={() => props.deleteNote(props.note)}
            color='red'
            size={22}
            style={styles.times}
          />
          <MdEdit
           style={styles.completed}
           size={22}
           color='black'
           onClick={() => props.updateNote(props.note)}
           />
        </div>
    </div>
    )
}
const styles = {
  container: {
    borderBottom: '1px solid rgba(0, 0, 0, .15)',
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    textAlign: 'left',
    fontSize: 18
  },
  iconContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}

  export default Note; 