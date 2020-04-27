import React from 'react';
import { FaTimes, FaCircle } from 'react-icons/fa'
import { MdCheckCircle, MdEdit } from 'react-icons/md';

const Note = (props) => {
  // console.log('yoyoyoyoy', props)
  const { name, description } = props.note;

    return (
      <div style={styles.container}>
        <p>{name}</p>
        {/* <p>{description}</p> */}
        {/* {
          props.filter === 'new' && (
            <FaCircle
              color='#FF9900'
              style={styles.new}
              size={22}
              onClick={() => props.updateNote(props.note)}
            />
          )
        }
        {
          props.filter === 'completed' && (
            <MdCheckCircle
              style={styles.completed}
              size={22}
              color='#FF9900'
              onClick={() => props.updateNote(props.note)}
            />
          )
        } */}
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
  },
  new: {
    marginRight: 10,
    cursor: 'pointer',
    opacity: .3
  },
  completed: {
    marginRight: 10,
    cursor: 'pointer'
  },
  times: {
    cursor: 'pointer',
    opacity: 0.7
  }
}

  export default Note; 