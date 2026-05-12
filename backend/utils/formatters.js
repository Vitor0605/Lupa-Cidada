/**
 * Formatadores de dados para a API
 */

const formatters = {
    /**
     * Garante que o objeto de indicador siga o contrato
     */
    formatIndicador(data) {
        return {
            nome: data.nome || 'N/A',
            valor: data.valor !== undefined ? data.valor : null,
            unidade: data.unidade || '',
            fonte: data.fonte || 'Desconhecida',
            ano: data.ano || new Date().getFullYear(),
            tendencia: data.tendencia || 'estavel',
            disponivel: data.disponivel !== undefined ? data.disponivel : (data.valor !== null)
        };
    },

    /**
     * Formata nome de cidade para exibição
     */
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
};

module.exports = formatters;
