const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const database = new Sequelize(configDatabase);

const { UsuarioModel } = require('../models/usuario-model');
const { CaminhaoModel } = require('../models/caminhao-model');
const { CaminhaoMotoristaModel } = require('../models/caminhao-motorista-model');
const { ManutencaoModel } = require('../models/manutencao-model');
const { MotoristaModel } = require('../models/motorista-model');
const { OficinaModel } = require('../models/oficina-model');

//Iniciando os models
UsuarioModel.init(database);
CaminhaoModel.init(database);
CaminhaoMotoristaModel.init(database);
ManutencaoModel.init(database);
MotoristaModel.init(database);
OficinaModel.init(database);

//associando os models
CaminhaoModel.associate(database.models);
CaminhaoMotoristaModel.associate(database.models);
CaminhaoMotoristaModel.associate(database.models);
ManutencaoModel.associate(database.models);
MotoristaModel.associate(database.models);
OficinaModel.associate(database.models);

module.exports = database;
