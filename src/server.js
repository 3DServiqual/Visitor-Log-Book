import app from "./app.js";
import http from "http";
import logger from "./config/logger.js";
import sequelize from "./config/database.js"; // Import the database configuration

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

sequelize.sync().then(() => {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
});

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.info("Listening on " + bind);
}
