import React, { useState } from 'react';
import '../src/table/table.css'; // Import the CSS file

const Grid = () => {
  let Row = 0;
  let Column = 0;

  // State to track the filled status of each box
  const [filledBoxes, setFilledBoxes] = useState(
    Array(8)
      .fill()
      .map(() => Array(8).fill(false))
  );

  // Function to fill the box and its parents in a hierarchy
  const fillBoxes = (row, col) => {
    const newFilledBoxes = filledBoxes.map((r) => [...r]);

    // Fill the current box and all parent boxes
    for (let i = 0; i <= row; i++) {
      newFilledBoxes[i][col] = true; // Fill current box and all boxes above
    }
    for (let j = 0; j <= col; j++) {
      newFilledBoxes[row][j] = true; // Fill current box and all boxes to the left
    }

    setFilledBoxes(newFilledBoxes); // Update state
  };

  return (
    <div className="grid">
      {filledBoxes.map((row, rowIndex) =>
        row.map((filled, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`box ${filled ? 'filled' : ''}`} // Add 'filled' class if filled
            onMouseEnter={() => fillBoxes(rowIndex, colIndex)} // Fill boxes on mouse enter
          />
        ))
      )}
      <div>
        <h1>Row {Row}</h1>
        <h1>kolumn {Column}</h1>
      </div>
    </div>
  );
};

export default Grid;
