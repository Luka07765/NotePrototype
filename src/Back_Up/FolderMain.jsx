import React, { useState } from 'react';
import Folder from './MapFolder/Folder'; // Your existing folder component
// import GraphView from './MapFolder/Flow'; // Import the GraphView component
import { v4 as uuid } from 'uuid';
// import SunburstChart from './d3';
// import Tree from './MapFolder/tree';
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
    // Open and display the file's contents in the main view
  };

  // Recursive function to add a file to the right folder
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

  // Recursive function to add a folder to the right folder
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
      {/* <Tree /> */}
      {/* <SunburstChart /> */}
      <Folder
        structure={structure}
        onSelectFile={onSelectFile}
        onAddFile={onAddFile}
        onAddFolder={onAddFolder}
      />
      <div className="main-content">
        {/* This is where you will show the content of the selected file */}
      </div>
      {/* <GraphView structure={structure} /> */}
    </div>
  );
}

export default App;
