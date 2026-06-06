const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/client.html"));
  });
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return { server, io, app };
};

const InitializeApp = () => {
  const { server, io, app } = createApp();
  return { server, io, app };
};

module.exports = { createApp, InitializeApp };

// db_updates -> triggers => backend listen krega then socketio ke through client ko update milegaa
