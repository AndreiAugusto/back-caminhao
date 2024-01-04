const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { DashboardController } = require('../controllers/dashboard');

const routesDashboard = Router();

const dashboardController = new DashboardController();

routesDashboard.get('/dashboard/manutencao/count', authMiddleware, dashboardController.somaManutencoes);
routesDashboard.get('/dashboard/oficina/count', authMiddleware, dashboardController.somaDeOficinas);
routesDashboard.get('/dashboard/oficina/countOne/:id', authMiddleware, dashboardController.somaDeUmaOficina);
routesDashboard.get('/dashboard/caminhao/count', authMiddleware, dashboardController.somaDeCaminhoes);
routesDashboard.get('/dashboard/caminhao/countOne/:id', authMiddleware, dashboardController.somaDeUmCaminhao);

module.exports = { routesDashboard }