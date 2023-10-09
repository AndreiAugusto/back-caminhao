const { HttpHelper } = require('../utils/http-helper');
const { MotoristaModel } = require('../models/motorista-model');
const { Validates } = require('../utils/validates');

class MotoristaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomeMotorista, nascimento, nCarteira } = request.body;

            //verifica validade de data
            const dataValida = Validates.validDate(nascimento);
            if(!dataValida){
                return httpHelper.badRequest('Data inválida')
            }

            if (!nomeMotorista, !nascimento, !nCarteira ) return httpHelper
                .badRequest('Parâmetros inválidos!');

            const motorista = await MotoristaModel.create({
                nomeMotorista, nascimento, nCarteira
            })
            return httpHelper.created(motorista);
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
            const motoristas = await MotoristaModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(motoristas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const motorista = await MotoristaModel.findOne(
                { where:{ id } }
            );
            if(!motorista) return httpHelper.notFound('Motorista não encontrado!');
            return httpHelper.ok(motorista.toJSON());
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const motoristaExists = await MotoristaModel.findOne({ where: { id } });
            if (!motoristaExists) return httpHelper.notFound('Motorista não encontrado!');
            await MotoristaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Motorista deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nomeMotorista, nascimento, nCarteira } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            //verifica validade de data
            if(nascimento){
                const dataValida = Validates.validDate(nascimento);
                if(!dataValida){
                    return httpHelper.badRequest('Data inválida')
                }
            }
            const motoristaExists = await MotoristaModel.findByPk(id);
            if (!motoristaExists) return httpHelper.notFound('Motorista não encontrado!');
            await MotoristaModel.update({ 
                nomeMotorista, nascimento, nCarteira
             }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Motorista atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { MotoristaController };