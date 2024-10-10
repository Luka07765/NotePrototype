// src/Navbar.js

import React from 'react';
import { Link } from 'react-scroll';
import './scroll.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="section1" smooth={true} duration={700}>
            Section 1
          </Link>
        </li>
        <li>
          <Link to="section2" smooth={true} duration={700}>
            Section 2
          </Link>
        </li>
        <li>
          <Link to="section3" smooth={true} duration={700}>
            Section 3
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
