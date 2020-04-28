import React from 'react';

const Form = (props) => {
  const { formState, setInput, createNote } = props;
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
      <button type="submit" onClick={createNote}>
        Create Note
      </button>
    </div>
  );
};

export default Form;
