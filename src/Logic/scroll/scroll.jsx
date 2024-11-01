// src/Navbar.js

import React from 'react';
import { Link } from 'react-scroll';
import './scroll.css';

const Navbar = ({ sections }) => {
  return (
    <nav>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <Link to={section.id} smooth={true} duration={700}>
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
