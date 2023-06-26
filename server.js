const express = require('express');
const app = express();
const { createServer } = require('http')
const { Server } = require("socket.io")
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


app.use(cors())

const server = createServer(app)

const io = new Server(server, {
    pingTimeout: 60 * 1000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

io.on('connection', (socket) => {
    socket.on("join_room", (room) => {
        socket.join(room)
    })

    socket.on("send_message", (messageObj) => {
        socket.to(messageObj.chatId).emit("receive_message", messageObj)
    });

    socket.off("join_room", () => {
        socket.leave(room);
    });

})
const PORT = process.env.PORT;
server.listen(PORT, () => console.log('SERVER CREATED'))