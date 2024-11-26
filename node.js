const express = require('express');
const app = express();

app.use(express.json());

const contents = []; // Replace with database logic

app.get('/api/contents', (req, res) => res.json(contents));
app.post('/api/contents', (req, res) => {
    const newContent = req.body;
    contents.push(newContent);
    res.status(201).json(newContent);
});
app.put('/api/contents/:id', (req, res) => {
    // Find and update content logic
});
app.delete('/api/contents/:id', (req, res) => {
    // Find and delete content logic
});

app.listen(3001, () => console.log('Server running on port 3001'));
