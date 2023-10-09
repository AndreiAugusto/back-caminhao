const { HttpHelper } = require('../utils/http-helper');
const { OficinaModel } = require('../models/oficina-model');
const { Validates } = require('../utils/validates');

class OficinaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nomeOficina } = request.body;

            if (!nomeOficina) return httpHelper
                .badRequest('Parâmetros inválidos!');

            const oficina = await OficinaModel.create({
                nomeOficina
            })
            return httpHelper.created(oficina);
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
            const oficinas = await OficinaModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(oficinas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const oficina = await OficinaModel.findOne(
                { where:{ id } }
            );
            if(!oficina) return httpHelper.notFound('Oficina não encontrada!');
            return httpHelper.ok(oficina.toJSON());
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const oficinaExists = await OficinaModel.findOne({ where: { id } });
            if (!oficinaExists) return httpHelper.notFound('Oficina não encontrada!');
            await OficinaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Oficina deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nomeOficina } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            const oficinaExists = await OficinaModel.findByPk(id);
            if (!oficinaExists) return httpHelper.notFound('Oficina não encontrada!');

            await OficinaModel.update({ 
                nomeOficina
             }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Oficina atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { OficinaController };