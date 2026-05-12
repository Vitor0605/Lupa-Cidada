const cityService = require('../services/cityService');

const cityController = {
    async getAll(req, res, next) {
        try {
            const cidades = await cityService.listAll();
            res.json(cidades);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const cidade = await cityService.findById(id);
            if (!cidade) {
                const err = new Error('Cidade não encontrada.');
                err.status = 404;
                throw err;
            }
            res.json(cidade);
        } catch (error) {
            next(error);
        }
    },

    async getTopicos(req, res, next) {
        try {
            const { id } = req.params;
            const topicos = await cityService.listTopicos(id);
            res.json(topicos);
        } catch (error) {
            next(error);
        }
    },

    async getTopicoData(req, res, next) {
        try {
            const { id, topico } = req.params;
            const data = await cityService.getTopicoIndicators(id, topico);
            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    async getUpdates(req, res, next) {
        try {
            const { id } = req.params;
            const updates = await cityService.getRecentUpdates(id);
            res.json(updates);
        } catch (error) {
            next(error);
        }
    },

    async getComparison(req, res, next) {
        try {
            const { cidades, topico } = req.query;
            if (!cidades || !topico) {
                const err = new Error('Parâmetros "cidades" e "topico" são obrigatórios.');
                err.status = 400;
                throw err;
            }
            const ids = cidades.split(',');
            const comparison = await cityService.compareCidades(ids, topico);
            res.json(comparison);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = cityController;
