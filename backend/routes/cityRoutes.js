const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Listar todas as cidades
router.get('/cidades', cityController.getAll);

// Dados de uma cidade específica
router.get('/cidades/:id', cityController.getById);

// Tópicos disponíveis de uma cidade
router.get('/cidades/:id/topicos', cityController.getTopicos);

// Indicadores de um tópico específico
router.get('/cidades/:id/topicos/:topico', cityController.getTopicoData);

// Feed de atualizações (global ou por cidade)
router.get('/atualizacoes', cityController.getUpdates);
router.get('/cidades/:id/atualizacoes', cityController.getUpdates);

// Comparativo entre cidades
router.get('/comparar', cityController.getComparison);

module.exports = router;
