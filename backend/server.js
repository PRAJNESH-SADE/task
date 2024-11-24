const express=require('express')
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize socket.io with the server
const io = new socketIo.Server(server, {
  cors: {
    origin: "*", // Or restrict it to your frontend URL
    methods: ["GET", "POST"]
  }
});

// WebSocket: Listen for incoming socket connections
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Listen for 'sendMessage' event from the client
  socket.on('sendMessage', (message) => {
    // Emit message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.json()); // Middleware for parsing JSON requests

// Route handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/comments', require('./routes/comment'));

// Connect to the database
connectDB();

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
