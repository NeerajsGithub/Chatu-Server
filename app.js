import dotenv from "dotenv";
import express from 'express';
import { router } from './routes/page.js';
import { connectDb } from './data/page.js';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server); 

app.use(express.json());
app.use(cors());

connectDb();

app.use(router);

const PORT =  process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('create room', (roomName) => {
    console.log(`Creating room: ${roomName}`);
    io.emit('room created', roomName);
  });
  socket.on('joinroom', (roomName, userName) => {
    socket.join(roomName);
    
    io.to(roomName).emit('chat message', `server:${userName} joined the room`);
    
    socket.on('chat message', (message) => {
      const [usersame, inputMessage] = message.split(':');
      if(!roomName) {

      }
      else {
        io.to(roomName).emit('chat message', `${usersame}: ${inputMessage}`);
      }
    });

    socket.on('disconnect-room', () => {
      io.to(roomName).emit('chat message', `${userName} left the room`);
      socket.leave(roomName); 
    });
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
