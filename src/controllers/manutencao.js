const { HttpHelper } = require('../utils/http-helper');
const { ManutencaoModel } = require('../models/manutencao-model');
const { CaminhaoModel } = require('../models/caminhao-model');
const { OficinaModel } = require('../models/oficina-model');

const { Validates } = require('../utils/validates');

class ManutencaoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { descricao, custo, data, caminhaoId, oficinaId } = request.body;

            //verifica validade de data
            const dataValida = Validates.validDate(data);
            if(!dataValida){
                return httpHelper.badRequest('Data inválida')
            }

            if (!descricao, !custo, !data, !caminhaoId, !oficinaId ) return httpHelper
                .badRequest('Parâmetros inválidos!');

            const caminhaoExists = await CaminhaoModel.findByPk(caminhaoId);
            if(!caminhaoExists) return httpHelper.notFound("Caminhão não encontrado!");

            const oficinaExists = await OficinaModel.findByPk(oficinaId);
            if(!oficinaExists) return httpHelper.notFound("Oficina não encontrada!");

            const manutencao = await ManutencaoModel.create({
                descricao, custo, data, caminhaoId, oficinaId
            })
            return httpHelper.created(manutencao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const ordenacao = request.query.ordenacao;
            let ordenacaoOpcoes = [['id', 'DESC']];

            switch (ordenacao) {
                case 'crescente':
                    ordenacaoOpcoes = [['id', 'ASC']];
                    break;
                case 'custoAsc':
                    ordenacaoOpcoes = [['custo', 'ASC']];
                    break;
                case 'custoDesc':
                    ordenacaoOpcoes = [['custo', 'DESC']];
                    break;
                case 'dataAsc':
                    ordenacaoOpcoes = [['data', 'ASC']];
                    break;
                case 'dataDesc':
                    ordenacaoOpcoes = [['data', 'DESC']];
                    break;
                case 'caminhaoAsc':
                    ordenacaoOpcoes = [['caminhaoId', 'ASC']];
                    break;
                case 'caminhaoDesc':
                    ordenacaoOpcoes = [['caminhaoId', 'DESC']];
                    break;
                case 'oficinaAsc':
                    ordenacaoOpcoes = [['oficinaId', 'ASC']];
                    break;
                case 'oficinaDesc':
                    ordenacaoOpcoes = [['oficinaId', 'DESC']];
                    break;
                default:
                    ordenacaoOpcoes = [['id', 'DESC']];
                    break;
            }
            const manutencoes = await ManutencaoModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(manutencoes);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const manutencao = await ManutencaoModel.findOne(
                { where:{ id } }
            );
            if(!manutencao) return httpHelper.notFound('Manutenção não encontrada!');
            return httpHelper.ok(manutencao.toJSON());
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const manutencaoExists = await ManutencaoModel.findOne({ where: { id } });
            if (!manutencaoExists) return httpHelper.notFound('Manutenção não encontrada!');
            await ManutencaoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Manutenção deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { descricao, custo, data, caminhaoId, oficinaId } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

            //verifica validade de data
            if(data){
                const dataValida = Validates.validDate(data);
                if(!dataValida){
                    return httpHelper.badRequest('Data inválida')
                }
            }
            const manutencaoExists = await ManutencaoModel.findByPk(id);
            if (!manutencaoExists) return httpHelper.notFound('Manutenção não encontrada!');

            if(caminhaoId){
                const caminhaoExists = await CaminhaoModel.findByPk(caminhaoId);
                if(!caminhaoExists) return httpHelper.notFound("Caminhão não encontrado!");
            }

            if(oficinaId){
                const oficinaExists = await OficinaModel.findByPk(oficinaId);
                if(!oficinaExists) return httpHelper.notFound("Oficina não encontrada!");
            }

            await ManutencaoModel.update({ 
                descricao, custo, data, caminhaoId, oficinaId
             }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Manutenção atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { ManutencaoController };