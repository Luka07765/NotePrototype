// src/App.js

import React from 'react';
import { Element } from 'react-scroll';
import Navbar from './Logic/scroll/scroll';
import './scroll.css'; // Import the CSS file

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Element name="section1" className="section">
          <h2>Section 1</h2>
          <p>Content for Section 1</p>
        </Element>
        <Element name="section2" className="section">
          <h2>Section 2</h2>
          <p>Content for Section 2</p>
        </Element>
        <Element name="section3" className="section">
          <h2>Section 3</h2>
          <p>Content for Section 3</p>
        </Element>
      </main>
    </div>
  );
};

export default App;
