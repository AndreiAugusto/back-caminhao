const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { ManutencaoController } = require('../controllers/manutencao');

const routesManutencao = Router();

const manutencaoController = new ManutencaoController();

routesManutencao.post('/manutencao/create', authMiddleware, manutencaoController.create);
routesManutencao.get('/manutencao/getAll', authMiddleware, manutencaoController.getAll);
routesManutencao.get('/manutencao/getOne/:id', authMiddleware, manutencaoController.getOne);
routesManutencao.delete('/manutencao/delete/:id', authMiddleware, manutencaoController.delete);
routesManutencao.put('/manutencao/update/:id', authMiddleware, manutencaoController.update);

module.exports = { routesManutencao };
