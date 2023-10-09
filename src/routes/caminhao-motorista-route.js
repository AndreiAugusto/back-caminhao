const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { CaminhaoMotoristaController } = require('../controllers/caminhao-motorista');

const routesCaminhaoMotorista = Router();

const caminhaoMotoristaController = new CaminhaoMotoristaController();

routesCaminhaoMotorista.post('/caminhaoMotorista/create', authMiddleware, caminhaoMotoristaController.create);
routesCaminhaoMotorista.get('/caminhaoMotorista/getAll', authMiddleware, caminhaoMotoristaController.getAll);
routesCaminhaoMotorista.get('/caminhaoMotorista/getOne/:id', authMiddleware, caminhaoMotoristaController.getOne);
routesCaminhaoMotorista.delete('/caminhaoMotorista/delete/:id', authMiddleware, caminhaoMotoristaController.delete);
routesCaminhaoMotorista.put('/caminhaoMotorista/update/:id', authMiddleware, caminhaoMotoristaController.update);

module.exports = { routesCaminhaoMotorista };
