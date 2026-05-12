/**
 * Funções utilitárias globais
 */

const utils = {
    /**
     * Formata números para o padrão brasileiro
     */
    formatarNumero(valor) {
        if (valor === null || valor === undefined) return 'N/A';
        return new Intl.NumberFormat('pt-BR').format(valor);
    },

    /**
     * Formata moeda (BRL)
     */
    formatarMoeda(valor) {
        if (valor === null || valor === undefined) return 'N/A';
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    },

    /**
     * Debounce para busca
     */
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    /**
     * Lê parâmetros da URL
     */
    lerParams() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    },

    /**
     * Navega para uma nova URL
     */
    navegarPara(url) {
        window.location.href = url;
    },

    /**
     * Retorna slug de uma string
     */
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    }
};
