import { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    addNote({ title, content, subject });

    setTitle("");
    setContent("");
    setSubject("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Subject (e.g. DBMS, Maths)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="Enter Note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button>Add Note</button>
    </form>
  );
}

export default NoteForm;