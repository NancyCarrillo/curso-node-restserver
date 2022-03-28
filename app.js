require('dotenv').config();
const Server = require('./models/server');

const server = new Server();//instancia del servidor

//lanzar el metodo listen 

server.listen();