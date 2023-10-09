const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { MotoristaController } = require('../controllers/motorista');

const routesMotorista = Router();

const motoristaController = new MotoristaController();

routesMotorista.post('/motorista/create', authMiddleware, motoristaController.create);
routesMotorista.get('/motorista/getAll', authMiddleware, motoristaController.getAll);
routesMotorista.get('/motorista/getOne/:id', authMiddleware, motoristaController.getOne);
routesMotorista.delete('/motorista/delete/:id', authMiddleware, motoristaController.delete);
routesMotorista.put('/motorista/update/:id', authMiddleware, motoristaController.update);

module.exports = { routesMotorista };
