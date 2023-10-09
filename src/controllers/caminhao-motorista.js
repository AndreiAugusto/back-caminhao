const { HttpHelper } = require('../utils/http-helper');
const { CaminhaoMotoristaModel } = require('../models/caminhao-motorista-model');
const { CaminhaoModel } = require('../models/caminhao-model');
const { MotoristaModel } = require('../models/motorista-model');

const { Validates } = require('../utils/validates');

class CaminhaoMotoristaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { data, motoristaId, caminhaoId } = request.body;

            if (!data, !motoristaId, !caminhaoId ) return httpHelper
                .badRequest('Parâmetros inválidos!');

            const caminhaoExists = await CaminhaoModel.findByPk(caminhaoId);
            if(!caminhaoExists) return httpHelper.notFound("Caminhão não encontrado!");
            
            const motoristaExists = await MotoristaModel.findByPk(motoristaId);
            if(!motoristaExists) return httpHelper.notFound("Motorista não encontrado!");

            //verifica validade de data
            const dataValida = Validates.validDate(data);
            if(!dataValida){
                return httpHelper.badRequest('Data inválida')
            }

            const caminhaomotorista = await CaminhaoMotoristaModel.create({
                data, motoristaId, caminhaoId
            })
            return httpHelper.created(caminhaomotorista);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const ordenacao = request.query.ordenacao;
            let ordenacaoOpcoes = [['id', 'DESC']];

            if (ordenacao === 'crescente') {
              ordenacaoOpcoes = [['id', 'ASC']];
            } else {
              ordenacaoOpcoes = [['id', 'DESC']];
            }
            const caminhaoMotorista = await CaminhaoMotoristaModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(caminhaoMotorista);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const caminhaoMotorista = await CaminhaoMotoristaModel.findOne(
                { where:{ id } }
            );
            if(!caminhaoMotorista) return httpHelper.notFound('Ligação caminhão motorista não encontrada!');
            return httpHelper.ok(caminhaoMotorista.toJSON());
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const caminhaoMotoristaExists = await CaminhaoMotoristaModel.findOne({ where: { id } });
            if (!caminhaoMotoristaExists) return httpHelper.notFound('Ligação caminhão motorista não encontrada!');
            await CaminhaoMotoristaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Ligação caminhão motorista deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { data, caminhaoId, motoristaId } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            //verifica validade de data
            if(data){
                const dataValida = Validates.validDate(data);
                if(!dataValida){
                    return httpHelper.badRequest('Data inválida')
                }
            }

            if(caminhaoId){
                const caminhaoExists = await CaminhaoModel.findByPk(caminhaoId);
                if(!caminhaoExists) return httpHelper.notFound("Caminhão não encontrado!");
            }
            
            if(motoristaId){
                const motoristaExists = await MotoristaModel.findByPk(motoristaId);
                if(!motoristaExists) return httpHelper.notFound("Motorista não encontrado!");
            }

            const caminhaoMotoristaExists = await CaminhaoMotoristaModel.findByPk(id);
            if (!caminhaoMotoristaExists) return httpHelper.notFound('Ligação caminhão motorista não encontrada!');
            await CaminhaoMotoristaModel.update({ 
                data, motoristaId, caminhaoId
             }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Ligação caminhão motorista atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { CaminhaoMotoristaController };