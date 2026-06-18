import { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    addNote({ title, content });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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