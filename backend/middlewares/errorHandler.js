/**
 * Middleware global para tratamento de erros
 */
function errorHandler(err, req, res, next) {
    console.error(`[ERRO] ${err.stack}`);

    const status = err.status || 500;
    const mensagem = err.message || 'Ocorreu um erro interno no servidor.';

    res.status(status).json({
        erro: mensagem,
        campo: err.campo || undefined
    });
}

module.exports = errorHandler;
