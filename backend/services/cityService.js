const NodeCache = require('node-cache');

// Cache: 24h para indicadores, 1h para atualizações
const indicatorCache = new NodeCache({ stdTTL: 86400 });
const updatesCache = new NodeCache({ stdTTL: 3600 });

// Mock Data inicial
const MOCK_CIDADES = [
    { id: "curitiba", nome: "Curitiba", populacao: 1961581, pib_per_capita: 58000, idh: 0.823, destaque: "Capital" },
    { id: "londrina", nome: "Londrina", populacao: 575377, pib_per_capita: 35000, idh: 0.778, destaque: "Norte" },
    { id: "maringa", nome: "Maringá", populacao: 430157, pib_per_capita: 38000, idh: 0.808, destaque: "Norte" },
    { id: "ponta-grossa", nome: "Ponta Grossa", populacao: 355336, pib_per_capita: 32000, idh: 0.763, destaque: "Campos Gerais" }
];

const cityService = {
    async listAll() {
        return MOCK_CIDADES;
    },

    async findById(id) {
        return MOCK_CIDADES.find(c => c.id === id);
    },

    async listTopicos(id) {
        return ['saude', 'educacao', 'seguranca', 'orcamento', 'mobilidade', 'meio-ambiente'];
    },

    async getTopicoIndicators(id, topicoSlug) {
        const cacheKey = `indicators_${id}_${topicoSlug}`;
        const cached = indicatorCache.get(cacheKey);
        if (cached) return cached;

        const cidade = MOCK_CIDADES.find(c => c.id === id);
        if (!cidade) throw new Error('Cidade não encontrada');

        // Simulação de dados (futuramente virá de APIs externas)
        const data = {
            cidade: cidade.nome,
            topico: topicoSlug.charAt(0).toUpperCase() + topicoSlug.slice(1),
            indicadores: [
                { 
                    nome: "Leitos/1.000 hab", 
                    valor: Math.random() * 5, 
                    unidade: "leitos/1.000 hab",
                    fonte: "DataSUS", 
                    ano: 2023, 
                    tendencia: "estavel", 
                    disponivel: true 
                },
                { 
                    nome: "Gasto per capita", 
                    valor: Math.random() * 2000, 
                    unidade: "R$",
                    fonte: "IPARDES", 
                    ano: 2022, 
                    tendencia: "subida", 
                    disponivel: true 
                },
                { 
                    nome: "Dado em processamento", 
                    valor: null, 
                    unidade: "%",
                    fonte: "IBGE", 
                    ano: 2024, 
                    tendencia: "estavel", 
                    disponivel: false 
                }
            ]
        };

        indicatorCache.set(cacheKey, data);
        return data;
    },

    async getRecentUpdates(cityId) {
        const cacheKey = `updates_${cityId || 'global'}`;
        const cached = updatesCache.get(cacheKey);
        if (cached) return cached;

        const updates = [
            { cidade: "Curitiba", topico: "saude", mensagem: "Novos dados de leitos hospitalares atualizados." },
            { cidade: "Londrina", topico: "educacao", mensagem: "Índice de evasão escolar do 1º semestre disponível." }
        ];

        const filtered = cityId ? updates.filter(u => u.cidade.toLowerCase() === cityId) : updates;
        
        updatesCache.set(cacheKey, filtered);
        return filtered;
    },

    async compareCidades(ids, topico) {
        const results = await Promise.all(ids.map(id => this.getTopicoIndicators(id, topico)));
        return results;
    }
};

module.exports = cityService;
