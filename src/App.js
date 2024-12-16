import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Main from './Logic/Main';
import Sidebar from './SideBar/Sidebar';

function App() {
  const [notes, setNotes] = useState(
    localStorage.getItem('notes')
      ? JSON.parse(localStorage.getItem('notes'))
      : []
  );

  const [structure, setStructure] = useState(
    localStorage.getItem('structure')
      ? JSON.parse(localStorage.getItem('structure'))
      : [
          {
            id: 'main',
            name: 'Main Folder',
            files: [],
            subfolders: [],
          },
        ]
  );

  const [activeNote, setActiveNote] = useState(false);

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

  const deleteFileFromFolder = (folders, noteId) => {
    return folders.map((folder) => {
      return {
        ...folder,
        files: folder.files.filter((file) => file.id !== noteId),
        subfolders: folder.subfolders.length
          ? deleteFileFromFolder(folder.subfolders, noteId)
          : [],
      };
    });
  };

  const onAddNote = (folderId) => {
    const newNote = {
      id: uuid(),
      title: '',
      body: '',
      items: [],
    };
    setStructure((prevStructure) =>
      addFileToFolder(prevStructure, folderId, newNote)
    );
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onAddFolder = (folderId) => {
    const newFolder = {
      id: uuid(),
      name: '',
      files: [],
      subfolders: [],
    };
    setStructure((prevStructure) =>
      addFolderToFolder(prevStructure, folderId, newFolder)
    );
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
    setStructure((prevStructure) =>
      deleteFileFromFolder(prevStructure, noteId)
    );
  };

  const updateNoteInFolder = (folders, updatedNote) => {
    return folders.map((folder) => {
      return {
        ...folder,
        files: folder.files.map((file) =>
          file.id === updatedNote.id ? updatedNote : file
        ),
        subfolders: folder.subfolders.length
          ? updateNoteInFolder(folder.subfolders, updatedNote)
          : [],
      };
    });
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesArr);

    // Also update the structure
    setStructure((prevStructure) =>
      updateNoteInFolder(prevStructure, updatedNote)
    );
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('structure', JSON.stringify(structure));
  }, [notes, structure]);

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        structure={structure}
        onAddFolder={onAddFolder}
      />

      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
