const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { OficinaController } = require('../controllers/oficina');

const routesOficina = Router();

const oficinaController = new OficinaController();

routesOficina.post('/oficina/create', authMiddleware, oficinaController.create);
routesOficina.get('/oficina/getAll', authMiddleware, oficinaController.getAll);
routesOficina.get('/oficina/getOne/:id', authMiddleware, oficinaController.getOne);
routesOficina.delete('/oficina/delete/:id', authMiddleware, oficinaController.delete);
routesOficina.put('/oficina/update/:id', authMiddleware, oficinaController.update);

module.exports = { routesOficina };
