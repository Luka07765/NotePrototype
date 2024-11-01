import React, { useState } from 'react';
import Folder from './Folder/Folder';
import GraphView from './Map/TreeMap';
import { v4 as uuid } from 'uuid';

function App() {
  const [structure, setStructure] = useState([
    {
      id: 'main',
      name: 'Main Folder',
      files: [],
      subfolders: [],
    },
  ]);

  const onSelectFile = (file) => {
    console.log('Selected file:', file);
  };

  const addFileToFolder = (folders, folderId, newFile) => {
    return folders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          files: [...folder.files, newFile],
        };
      } else if (folder.subfolders.length > 0) {
        return {
          ...folder,
          subfolders: addFileToFolder(folder.subfolders, folderId, newFile),
        };
      }
      return folder;
    });
  };

  const addFolderToFolder = (folders, folderId, newFolder) => {
    return folders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          subfolders: [...folder.subfolders, newFolder],
        };
      } else if (folder.subfolders.length > 0) {
        return {
          ...folder,
          subfolders: addFolderToFolder(folder.subfolders, folderId, newFolder),
        };
      }
      return folder;
    });
  };

  const onAddFile = (folderId) => {
    const newFile = { id: uuid(), name: 'New File' };
    setStructure((prevStructure) =>
      addFileToFolder(prevStructure, folderId, newFile)
    );
  };

  const onAddFolder = (folderId) => {
    const newFolder = {
      id: uuid(),
      name: 'New Folder',
      files: [],
      subfolders: [],
    };
    setStructure((prevStructure) =>
      addFolderToFolder(prevStructure, folderId, newFolder)
    );
  };

  return (
    <div className="App">
      <Folder
        structure={structure}
        onSelectFile={onSelectFile}
        onAddFile={onAddFile}
        onAddFolder={onAddFolder}
      />
      <div className="main-content"></div>
      {/* Pass the structure to the GraphView */}
      <GraphView structure={structure} />
    </div>
  );
}

export default App;
