import React from 'react'

const Form = (props) => {

    const { name, description } = props.formState;

    return (
        <div>
            <input 
                onChange={e => props.setInput('name', e.target.value)}
                value={name}
                placeholder="name"
            />
            <textarea 
                onChange={e => props.setInput('description', e.target.value)}
                value={description}
                placeholder="description"
            />
            <button onClick={props.createNote}>Create Note</button>

        </div>
    )
}
  
  export default Form;