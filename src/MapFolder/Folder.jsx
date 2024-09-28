import React, { useState } from 'react';
import './Folder.css';
const Folder = ({ folder, onSelectFile, onAddFile, onAddFolder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="folder">
      <div className="folder-name" onClick={toggleOpen}>
        {isOpen ? '📂' : '📁'} {folder.name}
      </div>
      {isOpen && (
        <div className="folder-contents">
          {/* Map through the files inside the folder */}
          {folder.files.map((file) => (
            <div
              key={file.id}
              className="file"
              onClick={() => onSelectFile(file)}
            >
              📝 {file.name}
            </div>
          ))}

          {/* Map through the subfolders recursively */}
          {folder.subfolders.map((subfolder) => (
            <Folder
              key={subfolder.id}
              folder={subfolder}
              onSelectFile={onSelectFile}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
            />
          ))}
          <button onClick={() => onAddFile(folder.id)}>+ Add File</button>
          <button onClick={() => onAddFolder(folder.id)}>+ Add Folder</button>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ structure, onSelectFile, onAddFile, onAddFolder }) => {
  return (
    <div className="sidebar">
      {structure.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          onSelectFile={onSelectFile}
          onAddFile={onAddFile}
          onAddFolder={onAddFolder}
        />
      ))}
    </div>
  );
};

export default Sidebar;
