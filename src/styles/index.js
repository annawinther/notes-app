import { FaTimes } from 'react-icons/fa';
import { MdEdit, MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';


// app styles

export const AppContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LoadButtonDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
`;

// notes styles

export const NotesContainerStyled = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const Button = styled.button`
background-color: #2F2E2F ;
text-align: left;
// margin-bottom: 0.5rem;
color: white;
height: 2.5rem;
&:hover{
  transition: 0.7s;
  background-color: #4A494A;
  border: 1px solid white;
  color: white;
}
`;
export const TopStyled = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 2rem 0;
    padding-left: 2rem;
    padding-right: 2rem;
`;

// note styles

export const TitleStyled = styled.span`
  font-weight: 500;
  color: #2F2E2F;
`;

export const DescriptionStyled = styled.p`
  margin-left: 2rem;
`;

export const ListItems = styled.ul`
    border-bottom: 1px solid #e3e3e3;
    &:nth-child(1){ 
      border-top: 1px solid  #e3e3e3;
    }
`;

export const EditIcon = styled(MdEdit)`
  color: grey;
  margin-left: 0.3rem;
  &:hover{
    cursor: pointer;
  }
`;

export const DeleteIcon = styled(FaTimes)`
  color: grey;
  &:hover{
    cursor: pointer;
  }
`;

export const ToggleIcon = styled(MdKeyboardArrowDown)`
  color: grey;
  margin-right: 0.5rem;
  will-change: transform, opacity;
  transition: 0.4s;
  transform: ${(props) => (props.rotate ? 'rotate(180deg)' : '')};
  &:hover{
    cursor: pointer;
  }
`;

// form styling

export const ButtonsDiv = styled.div`
  width: 100%;
  padding-right: 2rem;
  padding-left: 2rem;
  `;

export const FormStyled = styled.form`
  text-align: left;
  .form-group {
    margin: 0 auto 2rem;
    margin-top: 2rem;
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;
export const CreateSaveBtn = styled(Button)`
  width: 100%;
  padding-left: 2rem;
  text-align: center;
`;

// Navigation styling

export const NavBar = styled.ul`
  background: #2F2E2F;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .nav-link {
    color: white;
  }
`;
