import React, { useState } from 'react';
import './Folder.css';

const FolderStructure = ({
  structure,
  onSelectFile,
  onAddFile,
  onAddFolder,
}) => {
  // Helper function to handle toggling of folder open/closed state
  const [openFolders, setOpenFolders] = useState({});

  const toggleOpen = (folderId) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  // Recursive function to display folders and files
  const renderFolder = (folder) => {
    const isOpen = openFolders[folder.id] || false;

    return (
      <div key={folder.id} className="folder">
        {/* Folder name that can be clicked to expand/collapse */}
        <div
          className="folder-name"
          onClick={() => toggleOpen(folder.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? toggleOpen(folder.id) : null)} // Expand folder with Enter key
        >
          {isOpen ? '⭐ ' : '📁'} {folder.name}
        </div>

        {/* If the folder is open, render its contents */}
        {isOpen && (
          <div className="folder-contents">
            {/* Render files in the folder */}
            {folder.files.map((file) => (
              <div
                key={file.id}
                className="file"
                onClick={() => onSelectFile(file)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' ? onSelectFile(file) : null
                } // Select file with Enter key
              >
                📝 {file.name}
              </div>
            ))}

            {/* Recursively render subfolders */}
            {folder.subfolders.map((subfolder) => renderFolder(subfolder))}

            {/* Add file and folder buttons */}
            <div className="folder-actions">
              <button onClick={() => onAddFile(folder.id)}>+ Add File</button>
              <button onClick={() => onAddFolder(folder.id)}>
                + Add Folder
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sidebar">
      {/* Loop through the structure to display folders */}
      {structure.map((folder) => renderFolder(folder))}
    </div>
  );
};

export default FolderStructure;
