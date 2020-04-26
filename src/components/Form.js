import React from 'react'

const Form = (props) => {
    console.log('props', props)
    const { title, description } = props.formState;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && title !== '') {
          const note = {
            ...props.formState, status: 'new'
          }
         props.createNote(note)
        }
      }

    return (
        <div>
            <input 
                onChange={e => props.setInput('title', e.target.value)}
                onKeyPress={handleKeyPress}
                value={title}
                placeholder="title"
            />
            <textarea 
                onChange={e => props.setInput('description', e.target.value)}
                value={description}
                onKeyPress={handleKeyPress}
                placeholder="description"
            />
            <button onClick={props.createNote}>Create Note</button>

        </div>
    )
}
  
  export default Form;