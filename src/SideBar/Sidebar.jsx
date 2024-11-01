import React, { useState } from 'react';
import del from './../assets/delete.png';
import './../MapFolder/Folder.css'; // Import your CSS for styling

const Sidebar = ({
  structure,
  onAddNote,
  onAddFolder,
  onDeleteNote,
  activeNote,
  setActiveNote,

  onDeleteFolder,
  onUpdateFolderName, // New prop for updating folder name
}) => {
  const [openFolders, setOpenFolders] = useState({});
  const [editingFolder, setEditingFolder] = useState(null); // Track which folder is being edited
  const [folderNameInput, setFolderNameInput] = useState(''); // Temporary folder name input

  const toggleOpen = (folderId) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  const startEditingFolder = (folder) => {
    setEditingFolder(folder.id);
    setFolderNameInput(folder.name); // Set the current folder name into input
  };

  const handleFolderNameChange = (e) => {
    setFolderNameInput(e.target.value);
  };

  const saveFolderName = (folder) => {
    if (folderNameInput.trim() !== '') {
      onUpdateFolderName(folder.id, folderNameInput); // Call the parent function to update
    }
    setEditingFolder(null); // Exit edit mode
  };

  const renderFolder = (folder) => {
    const isOpen = openFolders[folder.id] || false;
    const isEditing = editingFolder === folder.id; // Check if this folder is being edited

    return (
      <div key={folder.id} className="folder">
        <div className="folder-name" role="button" tabIndex={0}>
          {isEditing ? (
            <input
              type="text"
              value={folderNameInput}
              onChange={handleFolderNameChange}
              onBlur={() => saveFolderName(folder)} // Save name on blur
              onKeyDown={(e) => e.key === 'Enter' && saveFolderName(folder)} // Save name on Enter key
              autoFocus
              className="folder-name-input"
            />
          ) : (
            <span onClick={() => toggleOpen(folder.id)}>
              {isOpen ? '⭐ ' : '📁'} {folder.name}
            </span>
          )}

          {!isEditing && (
            <button
              className="edit-button"
              onClick={(e) => {
                e.stopPropagation();
                startEditingFolder(folder); // Start editing the folder
              }}
            >
              ✏️
            </button>
          )}

          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFolder(folder.id);
            }}
          >
            <img className="delimg" src={del} alt="Delete" />
          </button>
        </div>

        {isOpen && (
          <div className="folder-contents">
            {/* Render notes (files) in the folder */}
            {folder.files.map((file) => (
              <div
                key={file.id}
                className={`file ${file.id === activeNote ? 'active' : ''}`}
                onClick={() => setActiveNote(file.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveNote(file.id)}
              >
                <span>📝 {file.title}</span>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(file.id);
                  }}
                >
                  <img className="delimg" src={del} alt="Delete" />
                </button>
              </div>
            ))}

            {/* Recursively render subfolders */}
            {folder.subfolders.map((subfolder) => renderFolder(subfolder))}

            {/* Add file and folder buttons */}
            <div className="folder-actions">
              <button className="add-note" onClick={() => onAddNote(folder.id)}>
                + Add Note
              </button>
              <button
                className="add-folder"
                onClick={() => onAddFolder(folder.id)}
              >
                + Add Folder
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-notes">
        {structure.map((folder) => renderFolder(folder))}
      </div>
    </div>
  );
};

export default Sidebar;
