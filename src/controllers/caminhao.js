const { HttpHelper } = require('../utils/http-helper');
const { CaminhaoModel } = require('../models/caminhao-model');

class CaminhaoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { modelo, ano } = request.body;
            if (!modelo, !ano) return httpHelper.badRequest('Parâmetros inválidos!');
            const caminhao = await CaminhaoModel.create({modelo, ano})
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
}


module.exports = { CaminhaoController };
