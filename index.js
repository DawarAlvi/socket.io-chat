const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit('user connected', "User Connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit('chat message', msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit('user disconnected', "User Disconnected");
  });
});


server.listen(3000, () => {
  console.log("listening on *:3000");
});
