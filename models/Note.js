// models/Note.js
const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  title: String,
  classLevel: String,
  group: String, // e.g., "Science", "Arts", "Pre-Engineering"
  subject: String, // e.g., "Mathematics"
  category: String, // e.g., "Exercise", "MCQs", "Short Questions"
  chapter: String,
  order: { type: Number, default: 0 },
  googleDriveLink: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', noteSchema);
