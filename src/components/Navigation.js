import React from 'react';

export default function Navigation() {
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Add Note</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Sign Out</a>
        </li>
      </ul>
    </div>
  );
}
