require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { routesUsuario } = require('./routes/usuario-route');
const { routesCaminhao } = require('./routes/caminhao-route');

const server = express();

server.use(express.json());
server.use(cors());

server.use(routesUsuario);
server.use(routesCaminhao);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`🚀 API iniciada: http://localhost:${PORT}`);
});
