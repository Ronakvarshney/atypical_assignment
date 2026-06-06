const Config = require("../core/config");
const { InitializeSchema, pool } = require("../core/db");
const { InitializeApp } = require("./bootstrap");
const router = require("./v1/routes/order.routes");

const StartServer = async () => {
  try {
    await InitializeSchema();
    const { server, io, app } = await InitializeApp();

    const listner = await pool.connect();
    await listner.query("LISTEN order_updates");
    listner.on("notification", (msg) => {
      const payload = JSON.parse(msg.payload);
      console.log("db updated", payload);
      io.emit('order-updated' , payload);
    });

    app.use("/orders", router);

    io.on("connection", (socket) => {
      console.log("Client Connected:", socket.id);
    });

    server.listen(Config.port, () => {
      console.log(`server running at port ${Config.port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

StartServer();
