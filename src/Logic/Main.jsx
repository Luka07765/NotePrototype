import React from 'react';
import plusIcon from './../assets/plus.png';
import deleteIcon from './../assets/delete.svg';
import './../Logic/Main.css';
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';

const Main = ({ activeNote, onUpdateNote }) => {
  let VisualNotes = 1;
  const AddTitle = 1;
  const AddSubTitle = 1;
  const AddListNumbers = 1; //ili nesto drugo
  const AddCodeSniptes = 1;
  const AddIconsDecoration = 1;
  const AddTupesBox = 1;

  const handleEditField = (field, value) => {
    const updatedNote = { ...activeNote, [field]: value };
    onUpdateNote(updatedNote);
  };

  const handleAddItem = () => {
    const updatedNote = {
      ...activeNote,
      items: [...(activeNote.items || []), { id: uuidv4(), text: '' }],
    };
    onUpdateNote(updatedNote);
  };

  const handleDeleteItem = (id) => {
    const updatedItems = activeNote.items.filter((item) => item.id !== id);
    const updatedNote = { ...activeNote, items: updatedItems };
    onUpdateNote(updatedNote);
  };

  const handleItemChange = (id, value) => {
    const updatedItems = activeNote.items.map((item) =>
      item.id === id ? { ...item, text: value } : item
    );
    const updatedNote = { ...activeNote, items: updatedItems };
    onUpdateNote(updatedNote);
  };

  if (!activeNote) {
    return (
      <div className="no-active-note">
        <h1>Nema Aktivne Beleske</h1>
        <h2>Kliknite praznu belesku</h2>
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Naslov"
          value={activeNote.title}
          onChange={(e) => handleEditField('title', e.target.value)}
          autoFocus
        />

        <div className="sidebar">
          <img src={plusIcon} alt="Add" onClick={handleAddItem} />
        </div>

        <div className="notesc">
          <ul>
            {(activeNote.items || []).map((item) => (
              <li key={item.id}>
                <div className="note">
                  <textarea
                    className="note_text"
                    value={item.text}
                    onChange={(e) => handleItemChange(item.id, e.target.value)}
                    placeholder="Dodaj stavku"
                  />
                  <div className="note_footer">
                    <img
                      src={deleteIcon}
                      alt="DELETE"
                      onClick={() => handleDeleteItem(item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

// let timer = 500,
//   timeout;

// const debounce = (func) => {
//   clearTimeout(timeout);
//   timeout = setTimeout(func, timer);
// };
