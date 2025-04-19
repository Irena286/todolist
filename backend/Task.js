
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  time: { type: String, required: true }
}, {
  versionKey: false
});

module.exports = mongoose.model('Task', TaskSchema, 'todolistcollection');
