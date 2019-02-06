'use strict';

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.js');
const middlewares  = jsonServer.defaults();
const PORT = 3500;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
