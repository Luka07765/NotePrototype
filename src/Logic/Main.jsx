import React from 'react';
import './../Logic/Main.css';

const Main = ({ activeNote, onUpdateNote }) => {
  const handleEditField = (field, value) => {
    const updatedNote = { ...activeNote, [field]: value };
    onUpdateNote(updatedNote);
  };

  if (!activeNote) {
    return (
      <div className="no-active-note">
        <h1>No Active Note</h1>
        <h2>Click on a note to view or edit</h2>
      </div>
    );
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={activeNote.title || ''}
          onChange={(e) => handleEditField('title', e.target.value)}
          autoFocus
        />
        <textarea
          id="content"
          placeholder="Write your content here..."
          value={activeNote.content || ''}
          onChange={(e) => handleEditField('content', e.target.value)}
        />
      </div>
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
