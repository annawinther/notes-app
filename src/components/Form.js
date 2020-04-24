import React from 'react'

const Form = (props) => {
    return (
        <div>
            <input 
                onChange={e => props.setInput('title', e.target.value)}
                value={props.formState.name}
                placeholder="title"
            />
            <input 
                onChange={e => props.setInput('description', e.target.value)}
                value={props.formState.description}
                placeholder="description"
            />
            <button onClick={props.createNote}>Create Note</button>
        </div>
    )
}
  
  export default Form;