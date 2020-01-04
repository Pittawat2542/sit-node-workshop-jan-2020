require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts-routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/new', (req, res) => res.sendFile(path.join(__dirname, 'public', 'edit.html')));

app.get('/:postId/edit', (req, res) => res.sendFile(path.join(__dirname, 'public', 'edit.html')));

app.use('/api/posts', postsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
});
