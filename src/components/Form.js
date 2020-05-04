import React from 'react';
import styled from 'styled-components';

const Form = ({
  formState, setInput, createNote, handleSubmit, edit, onCancel,
}) => {
  const { name, description } = formState;

  return (
    <FormStyled>
      {edit ? <h1>Update note</h1> : <h1>Add note</h1>}
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
        <Button type="button" className="btn" onClick={onCancel}> Cancel </Button>

        {
          edit ? <Button type="button" className="btn" onClick={() => handleSubmit(formState)}>Save</Button>
            : (
              <Button type="button" className="btn" onClick={createNote}>
                Create
              </Button>
            )
          }
      </ButtonsDiv>
    </FormStyled>
  );
};

export default Form;

const ButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  `;

const FormStyled = styled.form`
  text-align: center;
  
  .form-group {
    width: 50%;
    margin: 0 auto 2rem;
    margin-top: 2rem;
  }
`;

const Button = styled.button`
 background-color: #FF8C00;
 color: white;
 &:hover{
   background-color: #FFA500;
   color: white;
 }
`;
