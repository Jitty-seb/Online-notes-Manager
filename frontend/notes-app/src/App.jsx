import { useEffect, useState } from "react";
import API from "./services/api";
import NoteForm from "./components/NoteForm";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("/");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    await API.post("/", note);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/${id}`);
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const updateNote = async (id) => {
    await API.put(`/${id}`, {
      title: editTitle,
      content: editContent,
    });

    setEditingId(null);
    fetchNotes();
  };

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <NoteForm addNote={addNote} />

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="card" key={note._id}>
            {editingId === note._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <button onClick={() => updateNote(note._id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h2>{note.title}</h2>

                <p>{note.content}</p>

                <div className="buttons">
                  <button onClick={() => startEdit(note)}>
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;