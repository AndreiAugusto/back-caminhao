const { HttpHelper } = require('../utils/http-helper');
const { CaminhaoModel } = require('../models/caminhao-model');
const { Validates } = require('../utils/validates');

class CaminhaoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { modelo, ano, placa } = request.body;
            if (!modelo, !ano, !placa) return httpHelper.badRequest('Parâmetros inválidos!');

            //verifica validade de data
            const dataValida = Validates.validDate(ano);
            if(!dataValida){
                return httpHelper.badRequest('Data inválida')
            }

            const caminhao = await CaminhaoModel.create({modelo, ano, placa})
            return httpHelper.created(caminhao);
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
            const caminhoes = await CaminhaoModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(caminhoes);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const caminhao = await CaminhaoModel.findOne(
                { where:{ id } }
            );
            if(!caminhao) return httpHelper.notFound('Caminhão não encontrado!');
            return httpHelper.ok(caminhao.toJSON());
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const caminhaoExists = await CaminhaoModel.findOne({ where: { id } });
            if (!caminhaoExists) return httpHelper.notFound('Caminhao não encontrado!');
            await CaminhaoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Caminhão deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { modelo, ano, placa } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            //verifica validade de data
            if(ano){
                const dataValida = Validates.validDate(ano);
                if(!dataValida){
                    return httpHelper.badRequest('Data inválida')
                }
            }
            const caminhaoExists = await CaminhaoModel.findByPk(id);
            if (!caminhaoExists) return httpHelper.notFound('Caminhão não encontrado!');
            await CaminhaoModel.update({ 
                modelo, ano, placa
             }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Caminhao atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}


module.exports = { CaminhaoController };
