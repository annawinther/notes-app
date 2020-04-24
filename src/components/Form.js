import React from 'react'

const Form = (props) => {
    const { title, description } = props.formState;
    return (
        <div>
            <input 
                onChange={e => props.setInput('title', e.target.value)}
                value={title}
                placeholder="title"
            />
            <input 
                onChange={e => props.setInput('description', e.target.value)}
                value={description}
                placeholder="description"
            />
            <button onClick={props.createNote}>Create Note</button>
        </div>
    )
}
  
  export default Form;