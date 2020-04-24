import React from 'react';
import Note from './Note';

const Notes = (props) => {
    return (
        <div>
            {
                props.notes.map((note, index) => {
                    return (
                        <Note 
                            key={index}
                            note={note}
                            deleteNote={props.deleteNote}
                            updateNote={props.updateNote}
                        />
                    )
                })
            }
        </div>
    )
}

  export default Notes;