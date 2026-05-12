/**
 * Inicialização da página inicial
 */

document.addEventListener('DOMContentLoaded', async () => {
    const citiesGrid = document.getElementById('cities-grid');
    const updatesFeed = document.getElementById('updates-feed');

    // Carregar Cidades em Destaque
    async function carregarCidades() {
        render.loading(citiesGrid, 'card', 4);
        try {
            const cidades = await getCidades();
            render.cidades(citiesGrid, cidades);
        } catch (error) {
            render.erro(citiesGrid, 'Erro ao carregar cidades.', carregarCidades);
        }
    }

    // Carregar Atualizações
    async function carregarAtualizacoes() {
        render.loading(updatesFeed, 'update', 2);
        try {
            // No index, pegamos atualizações gerais (passando null ou endpoint global)
            const atualizacoes = await getAtualizacoes(null);
            render.atualizacoes(updatesFeed, atualizacoes);
        } catch (error) {
            render.erro(updatesFeed, 'Erro ao carregar atualizações.', carregarAtualizacoes);
        }
    }

    // Executa carregamentos
    carregarCidades();
    carregarAtualizacoes();

    // Busca de Cidades
    const searchInput = document.getElementById('city-search');
    if (searchInput) {
        searchInput.addEventListener('input', utils.debounce(async (e) => {
            const termo = e.target.value.trim().toLowerCase();
            const resultsContainer = document.getElementById('search-results');
            
            if (termo.length < 2) {
                resultsContainer.classList.add('hidden');
                return;
            }

            // Lógica de filtro (em um app real, seria via API ou busca no cache)
            try {
                const todas = await getCidades();
                const filtradas = todas.filter(c => 
                    c.nome.toLowerCase().includes(termo)
                );
                
                if (filtradas.length > 0) {
                    resultsContainer.innerHTML = filtradas.map(c => `
                        <div class="search-result-item" onclick="utils.navegarPara('topico.html?cidade=${c.id}')">
                            ${c.nome}
                        </div>
                    `).join('');
                    resultsContainer.classList.remove('hidden');
                } else {
                    resultsContainer.innerHTML = '<div class="search-result-item">Nenhuma cidade encontrada</div>';
                    resultsContainer.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Erro na busca:', error);
            }
        }, 300));
    }
});
