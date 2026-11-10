import { createServer } from "node:http";
import { config } from "./config";
import { attachWebSocket, createApp } from "./createApp";

const app = createApp();
const server = createServer(app);
attachWebSocket(server);
server.listen(config.port, () => {
  console.log(`Luna API sur le port ${config.port}`);
});
