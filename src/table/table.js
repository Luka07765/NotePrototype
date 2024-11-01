import React, { useState } from 'react';

const EditableCell = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

// Grid component for selecting number of rows and columns
const GridSelector = ({ onSelectionComplete }) => {
  const [filledBoxes, setFilledBoxes] = useState(
    Array(8)
      .fill()
      .map(() => Array(8).fill(false))
  );

  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  // Function to fill the boxes up to the selected cell
  const fillBoxes = (row, col) => {
    const newFilledBoxes = filledBoxes.map((r, i) =>
      r.map((_, j) => i <= row && j <= col)
    );

    setFilledBoxes(newFilledBoxes);
    setRowCount(row + 1);
    setColumnCount(col + 1);
  };

  // Handle cell click to finalize selection
  const handleCellClick = () => {
    onSelectionComplete(rowCount, columnCount);

    // Reset the grid selection after creating a table
    setFilledBoxes(
      Array(8)
        .fill()
        .map(() => Array(8).fill(false))
    );
    setRowCount(0);
    setColumnCount(0);
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {filledBoxes.map((row, rowIndex) =>
          row.map((filled, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`box ${filled ? 'filled' : ''}`}
              onMouseEnter={() => fillBoxes(rowIndex, colIndex)}
              onClick={handleCellClick}
            />
          ))
        )}
      </div>
      <div>
        <h1>Rows: {rowCount}</h1>
        <h1>Columns: {columnCount}</h1>
        <p>Hover over the grid and click to select size.</p>
      </div>
    </div>
  );
};

const TableComponent = ({ numRows, numCols }) => {
  // Initialize headers and rows based on selected grid size
  const [headers, setHeaders] = useState(
    Array.from({ length: numCols }, (_, i) => `Column ${i + 1}`)
  );
  const [rows, setRows] = useState(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => '')
    )
  );

  // Function to handle changes in the cell values
  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex] = value;
    setRows(newRows);
  };

  // Functions to add or remove rows and columns
  const addRow = () => {
    const newRow = new Array(headers.length).fill('');
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const addColumn = () => {
    const newHeaders = [...headers, `Column ${headers.length + 1}`];
    const newRows = rows.map((row) => [...row, '']);
    setHeaders(newHeaders);
    setRows(newRows);
  };

  const removeColumn = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    const newRows = rows.map((row) => row.filter((_, i) => i !== index));
    setHeaders(newHeaders);
    setRows(newRows);
  };

  return (
    <div>
      {/* Render the table */}
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                {header}
                <button onClick={() => removeColumn(index)}>Remove</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <EditableCell
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, cellIndex, e.target.value)
                    }
                  />
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(rowIndex)}>Remove Row</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Buttons to add rows and columns */}
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
    </div>
  );
};

const Table = () => {
  // State to hold multiple tables
  const [tables, setTables] = useState([]);

  // Callback function when grid selection is complete
  const handleSelectionComplete = (rows, cols) => {
    // Add a new table to the list of tables
    setTables([...tables, { numRows: rows, numCols: cols }]);
  };

  return (
    <div>
      {/* Grid selector remains visible */}
      <GridSelector onSelectionComplete={handleSelectionComplete} />

      {/* Render the list of tables */}
      {tables.map((tableData, index) => (
        <TableComponent
          key={index}
          numRows={tableData.numRows}
          numCols={tableData.numCols}
        />
      ))}

      <style jsx>{`
        .grid-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(8, 30px);
          grid-template-rows: repeat(8, 30px);
          gap: 2px;
          margin-bottom: 10px;
        }
        .box {
          width: 30px;
          height: 30px;
          background-color: #ddd;
          border: 1px solid #ccc;
        }
        .box.filled {
          background-color: #007bff;
        }
        table {
          border-collapse: collapse;
          width: 50%;
          margin-bottom: 20px;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        input {
          width: 100%;
          border: none;
          outline: none;
        }
        button {
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default Table;
