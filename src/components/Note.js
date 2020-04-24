import React from 'react';

const Note = (props) => {
  const { title, description } = props.note;
    return (
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
    )
}

  export default Note; 