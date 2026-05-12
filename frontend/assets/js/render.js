/**
 * Funções de renderização de componentes
 */

const render = {
    /**
     * Renderiza o grid de cidades
     */
    cidades(container, cidades) {
        if (!cidades || cidades.length === 0) {
            container.innerHTML = '<p class="error-msg">Nenhuma cidade encontrada.</p>';
            return;
        }

        container.innerHTML = cidades.map(cidade => `
            <div class="city-card" onclick="utils.navegarPara('topico.html?cidade=${cidade.id}')">
                <h4>${cidade.nome}</h4>
                <p>População: ${utils.formatarNumero(cidade.populacao)}</p>
                ${cidade.destaque ? `<span class="city-badge">${cidade.destaque}</span>` : ''}
            </div>
        `).join('');
    },

    /**
     * Renderiza o feed de atualizações
     */
    atualizacoes(container, atualizacoes) {
        if (!atualizacoes || atualizacoes.length === 0) {
            container.innerHTML = '<p class="info-msg">Sem atualizações recentes.</p>';
            return;
        }

        container.innerHTML = atualizacoes.map(item => `
            <div class="update-item">
                <span class="update-icon">${this._getIconForTopico(item.topico)}</span>
                <div class="update-content">
                    <h5>${item.cidade} - ${item.topico}</h5>
                    <p>${item.mensagem}</p>
                </div>
            </div>
        `).join('');
    },

    /**
     * Estado de Erro
     */
    erro(container, mensagem, retryCallback) {
        container.innerHTML = `
            <div class="error-card">
                <p>❌ ${mensagem}</p>
                <button class="retry-btn">Tentar novamente</button>
            </div>
        `;
        
        const btn = container.querySelector('.retry-btn');
        if (btn && retryCallback) {
            btn.addEventListener('click', retryCallback);
        }
    },

    /**
     * Estado de Loading (Skeletons)
     */
    loading(container, type = 'card', count = 4) {
        let html = '';
        const className = type === 'card' ? 'skeleton-card' : 'skeleton-update';
        
        for (let i = 0; i < count; i++) {
            html += `<div class="${className}"></div>`;
        }
        
        container.innerHTML = html;
    },

    _getIconForTopico(topico) {
        const icons = {
            'saude': '🏥',
            'educacao': '🎓',
            'seguranca': '🛡️',
            'orcamento': '💰',
            'mobilidade': '🚌',
            'meio-ambiente': '🌳'
        };
        return icons[topico.toLowerCase()] || '📄';
    }
};
