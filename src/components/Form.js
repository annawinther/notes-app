import React from 'react';
import {
  ButtonsDiv, FormStyled, Button, TopStyled, CreateSaveBtn,
} from '../styles';

const Form = ({
  formState, setInput, createNote, handleSubmit, edit, onCancel,
}) => {
  const { name, description } = formState;

  return (
    <FormStyled>
      <TopStyled>
        {edit ? <h1>Update note</h1> : <h1>Add note</h1>}
        <Button type="button" className="btn" onClick={onCancel}> Cancel </Button>
      </TopStyled>

      <div className="form-group">
        <input
          className="form-control"
          onChange={(e) => setInput('name', e.target.value)}
          value={name}
          placeholder="title"
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
      <ButtonsDiv>
        {
          edit ? <CreateSaveBtn type="button" className="btn" onClick={() => handleSubmit(formState)}>Save</CreateSaveBtn>
            : (
              <CreateSaveBtn type="button" className="btn" onClick={createNote}>
                Create
              </CreateSaveBtn>
            )
        }
      </ButtonsDiv>
    </FormStyled>
  );
};

export default Form;
