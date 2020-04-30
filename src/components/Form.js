import React from 'react';

const Form = ({
  formState, setInput, createNote, handleSubmit, edit,
}) => {
  const { name, description } = formState;

  return (
    <form>
      {edit ? <h2>Update note</h2> : <h2>Add note</h2>}
      <div className="form-group">
        <input
          className="form-control"
          onChange={(e) => setInput('name', e.target.value)}
          value={name}
          placeholder="name"
        />

      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          onChange={(e) => setInput('description', e.target.value)}
          value={description}
          placeholder="description"
        />

      </div>
      {
          edit ? <button type="button" className="btn btn-dark" onClick={() => handleSubmit(formState)}>Save</button>
            : (
              <button type="button" className="btn btn-dark" onClick={createNote}>
                Create Note
              </button>
            )
       }
    </form>
  );
};

export default Form;
