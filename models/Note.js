// models/Note.js
const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  title: String,
  classLevel: String,
  subject: String,
  googleDriveLink: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', noteSchema);
