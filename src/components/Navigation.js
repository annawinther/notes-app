import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export default function Navigation() {
  const onSignOut = () => {
    Auth.signOut();
  };
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add">Add Note</Link>
        </li>
        <li className="nav-item">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link className="nav-link active" to="#" onClick={() => onSignOut()}>Sign Out</Link>
        </li>
      </ul>
    </div>
  );
}
