require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const taskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  time: { type: String, required: true }
}, {
  versionKey: false
});

const Task = mongoose.model('Task', taskSchema, 'todolistcollection');


app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});


app.post('/tasks', async (req, res) => {
  const { content, time } = req.body;
  const newTask = new Task({ content, time });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save task', details: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
