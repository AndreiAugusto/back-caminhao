const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { CaminhaoController } = require('../controllers/caminhao');

const routesCaminhao = Router();

const caminhaoController = new CaminhaoController();

routesCaminhao.post('/create', authMiddleware, caminhaoController.create);
routesCaminhao.get('/getAll', authMiddleware, caminhaoController.getAll)

module.exports = { routesCaminhao };
