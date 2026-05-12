/**
 * Gerenciamento de tema (claro/escuro)
 */

const TEMA_KEY = 'lupa-tema';

function inicializarTema() {
    const temaSalvo = localStorage.getItem(TEMA_KEY);
    const html = document.documentElement;
    
    if (temaSalvo === 'dark') {
        html.classList.add('dark-mode');
    } else if (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Opcional: respeitar preferência do sistema se não houver salvo
        html.classList.add('dark-mode');
    }

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', alternarTema);
    }
}

function alternarTema() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark-mode');
    
    localStorage.setItem(TEMA_KEY, isDark ? 'dark' : 'light');
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarTema);
