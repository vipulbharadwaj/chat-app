require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("A User is connected", socket.id);
    // Handle incoming messages from the client
    //socket.emit("welcome",`Welcome to the server ${socket.id}`);
    socket.on("message", (data)=>{
        console.log("Received message from client: ", data);
        // Broadcast the message to all connected clients
        socket.broadcast.emit("message", data);
    })
});


app.get('/', (req, res) => {
    res.send('Hello World');
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
