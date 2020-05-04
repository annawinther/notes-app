import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

const Navigation = () => {
  const onSignOut = () => {
    Auth.signOut();
  };

  return (
    <NavBar>
      <li className="nav-item">
        <Link className="nav-link active" to="/">All Notes</Link>
      </li>

      <li className="nav-item">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className="nav-link active" to="#" onClick={() => onSignOut()}>Sign Out</Link>
      </li>
    </NavBar>
  );
};

const NavBar = styled.ul`
  background: #FF8C00;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .nav-link {
    color: white;
  }
`;

export default Navigation;
