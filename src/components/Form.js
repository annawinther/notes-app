import React from 'react';

const Form = ({
  formState, setInput, createNote, handleSubmit, edit,
}) => {
  const { name, description } = formState;

  return (
    <div>
      <input
        onChange={(e) => setInput('name', e.target.value)}
        value={name}
        placeholder="name"
      />
      <textarea
        onChange={(e) => setInput('description', e.target.value)}
        value={description}
        placeholder="description"
      />
      {
          edit ? <button type="submit" onClick={() => handleSubmit(formState)}>Save</button>
            : (
              <button type="submit" onClick={createNote}>
                Create Note
              </button>
            )
       }
    </div>
  );
};

export default Form;
