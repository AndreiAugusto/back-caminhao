const { CaminhaoModel } = require('../models/caminhao-model');
const { ManutencaoModel } = require('../models/manutencao-model');
const { OficinaModel } = require('../models/oficina-model');
const { HttpHelper } = require('../utils/http-helper');

class DashboardController {
    async somaManutencoes(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const result = await ManutencaoModel.count();
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);            
        }
    }

    async somaDeOficinas(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const result = await OficinaModel.count();
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);            
        }
    }

    async somaDeUmaOficina(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if(!id) return httpHelper.badRequest('Parâmetros inválidos');
            const result = await ManutencaoModel.count(
                { where: { oficinaId: id } }
            );
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);            
        }
    }

    async somaDeCaminhoes(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const result = await CaminhaoModel.count();
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);            
        }
    }

    async somaDeUmCaminhao(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if(!id) return httpHelper.badRequest('Parâmetros inválidos');
            const result = await ManutencaoModel.count(
                { where: { caminhaoId: id } }
            );
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);            
        }
    }
}

module.exports = { DashboardController }