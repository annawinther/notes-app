import React from 'react';
import { MdClear } from 'react-icons/md';
import { debounce, delay } from 'lodash';
import {
  ButtonsDiv, FormStyled, Button, TopStyled, CreateSaveBtn,
} from '../styles';

const Form = ({
  formState, setInput, createNote, handleSubmit, edit, onCancel,
}) => {
  const { name, description } = formState;
  // console.log(name)
  // const [ search, setSearch ] = useState('')


  const handleUpdate = debounce((e) => {
  // setSearch(e)
  // handleChange(e)
    setInput('name', e);
  }, 1000);

  const handleUpdateDes = debounce((e) => {
  // setSearch(e)
  // handleChange(e)
    setInput('description', e);
  }, 1000);

  return (
    <FormStyled>
      <TopStyled>
        {edit ? <h1>Update note</h1> : <h1>Add note</h1>}
        <Button type="button" className="btn" onClick={onCancel}>
          <MdClear />
          {' '}
          Cancel
        </Button>
      </TopStyled>

      <div className="form-group">
        <input
          className="form-control"
          onChange={(e) => handleUpdate(e.target.value)}
          // value={search}
          placeholder="Title"
        />
        {/* <p>{name}</p> */}

      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          onChange={(e) => handleUpdateDes(e.target.value)}
          // value={description}
          placeholder="Description"
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
