import { useState } from 'react';

const EditableCell = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

const BoxTable = () => {};
const CreateTable = () => {}; // number row and column

const Table = () => {
  const [rows, setRows] = useState([
    ['', ''],
    ['', ''],
  ]);
  const [headers, setHeaders] = useState(['Column 1', 'Column 2']);

  const addRow = () => {
    setRows([...rows, ['', '']]);
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

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex] = value;
    setRows(newRows);
  };

  return (
    <div>
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
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <style jsx>{`
        table {
          border-collapse: collapse;
          width: 100%;
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
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default Table;
