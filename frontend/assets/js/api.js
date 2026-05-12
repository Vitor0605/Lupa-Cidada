/**
 * Único ponto de contato com a API do backend.
 */

const BASE_URL = 'http://localhost:3000/api/v1';

// Cache em memória com TTL de 5 minutos
const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

async function apiFetch(endpoint) {
    const agora = Date.now();
    
    // Verifica cache
    if (_cache.has(endpoint)) {
        const { dados, timestamp } = _cache.get(endpoint);
        if (agora - timestamp < CACHE_TTL) {
            console.log(`[Cache] Usando dados para: ${endpoint}`);
            return dados;
        }
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        
        if (!response.ok) {
            const erroData = await response.json();
            const erro = new Error(erroData.erro || 'Erro na requisição');
            erro.status = response.status;
            throw erro;
        }

        const dados = await response.json();
        
        // Salva no cache
        _cache.set(endpoint, { dados, timestamp: agora });
        
        return dados;
    } catch (error) {
        console.error(`[API] Erro ao buscar ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Funções exportadas por recurso
 */

async function getCidades() {
    return apiFetch('/cidades');
}

async function getCidade(id) {
    return apiFetch(`/cidades/${id}`);
}

async function getTopicos(id) {
    return apiFetch(`/cidades/${id}/topicos`);
}

async function getTopico(id, topico) {
    return apiFetch(`/cidades/${id}/topicos/${topico}`);
}

async function getAtualizacoes(id) {
    const path = id ? `/cidades/${id}/atualizacoes` : '/atualizacoes'; // Ajustar conforme backend
    return apiFetch(path);
}

async function getComparativo(cidades, topico) {
    if (!Array.isArray(cidades) || cidades.length < 2) {
        throw new Error('Selecione pelo menos duas cidades para comparar.');
    }
    const ids = cidades.join(',');
    return apiFetch(`/comparar?cidades=${ids}&topico=${topico}`);
}
