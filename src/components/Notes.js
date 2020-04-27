import React from 'react';
import Note from './Note';

const Notes = (props) => {
    // console.log('map',props)

    return (
        <div>
            {
                props.notes.map((note, index) => {
                    // console.log('nnn', note)
                    return (
                        <Note 
                            key={index}
                            // idx={index}
                            note={note}
                            filter={props.filter}
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