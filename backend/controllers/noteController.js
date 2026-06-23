const Note = require("../models/Note");

// Get All Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Create Note
const createNote = async (req, res) => {
  const { title, content, subject } = req.body;

  const note = await Note.create({
    title,
    content,
    subject
  });

  res.status(201).json(note);
};
// Update Note
const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(note);
};

// Delete Note
const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  res.json({
    message: "Note Deleted",
  });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};