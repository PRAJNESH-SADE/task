const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const dotenv=require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
});

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/comments', require('./routes/comment'));

connectDB();

server.listen(5000, () => console.log('Server running on port 5000'));
