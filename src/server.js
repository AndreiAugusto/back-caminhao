require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { routesUsuario } = require('./routes/usuario-route');
const { routesCaminhao } = require('./routes/caminhao-route');
const { routesMotorista } = require('./routes/motorista-route');
const { routesOficina } = require('./routes/oficina-route');
const { routesManutencao } = require('./routes/manutencao-route');
const { routesCaminhaoMotorista } = require('./routes/caminhao-motorista-route');
const { routesDashboard } = require('./routes/dashboard-route');

const server = express();

server.use(express.json());
server.use(cors());

server.use(routesUsuario);
server.use(routesCaminhao);
server.use(routesMotorista);
server.use(routesOficina);
server.use(routesManutencao);
server.use(routesCaminhaoMotorista);
server.use(routesDashboard);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`🚀 API iniciada: http://localhost:${PORT}`);
});
