/**
 * Validadores de parâmetros e entradas
 */

const validators = {
    /**
     * Valida se um ID de cidade é válido (string não vazia)
     */
    isValidCityId(id) {
        return typeof id === 'string' && id.trim().length > 0;
    },

    /**
     * Valida se o tópico é um dos permitidos
     */
    isValidTopico(topico) {
        const permitidos = ['saude', 'educacao', 'seguranca', 'orcamento', 'mobilidade', 'meio-ambiente'];
        return permitidos.includes(topico.toLowerCase());
    },

    /**
     * Valida lista de cidades para comparação
     */
    isValidComparison(cidadesStr) {
        if (!cidadesStr) return false;
        const ids = cidadesStr.split(',');
        return ids.length >= 2 && ids.every(id => id.trim().length > 0);
    }
};

module.exports = validators;
