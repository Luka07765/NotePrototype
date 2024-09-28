import plus from './../assets/plus.png';
import del from './../assets/delete.png';
const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Dodaj</h1>
        <button onClick={onAddNote}>
          <img className="plusimg" src={plus} alt="Add" />
        </button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map(({ id, title }) => (
          <div
            className={`app-sidebar-note ${id === activeNote && 'active'}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>
                <img className="delimg" src={del} alt="Add" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
