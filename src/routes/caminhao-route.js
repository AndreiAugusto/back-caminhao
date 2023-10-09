const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { CaminhaoController } = require('../controllers/caminhao');

const routesCaminhao = Router();

const caminhaoController = new CaminhaoController();

routesCaminhao.post('/caminhao/create', authMiddleware, caminhaoController.create);
routesCaminhao.get('/caminhao/getAll', authMiddleware, caminhaoController.getAll);
routesCaminhao.get('/caminhao/getOne/:id', authMiddleware, caminhaoController.getOne);
routesCaminhao.delete('/caminhao/delete/:id', authMiddleware, caminhaoController.delete);
routesCaminhao.put('/caminhao/update/:id', authMiddleware, caminhaoController.update);

module.exports = { routesCaminhao };
