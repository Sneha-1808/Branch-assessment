// const http = require('http');
// const server = http.createServer((req, res) => {
//   // Handle HTTP requests if needed
// });

// const { Server } = require('socket.io');
// const io = new Server(server);

// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Handle chat messages
//   socket.on('chat message', (message) => {
//     io.emit('chat message', message); // Broadcast the message to all connected clients
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(3001, () => {
//   console.log('WebSocket server listening on port 3001');
// });

// server.js
const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust the origin to match your Next.js app
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a test message to the connected client
  socket.emit('message', { Timestamp: 'Server'});

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 4000; // Choose a suitable port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
