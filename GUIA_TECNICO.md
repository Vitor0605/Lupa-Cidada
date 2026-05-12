# Guia Técnico — Lupa Cidadã

## Padrões de Desenvolvimento

### Front-end
- **Vanilla JS**: Não utilize frameworks (React, Vue, etc.).
- **CSS Variables**: Use sempre as variáveis em `variables.css`.
- **API Centralizada**: Todas as chamadas de rede devem passar por `api.js`.
- **Mobile-first**: O design base é 390px.

### Back-end
- **Arquitetura**: Route → Controller → Service.
- **Cache**: Implementado no Service com TTLs específicos.
- **Contrato**: Respostas de erro devem seguir o formato `{ erro: string, campo?: string }`.

## Fluxo de Dados
1. O Front-end solicita um endpoint (ex: `/api/v1/cidades`).
2. O Controller valida os parâmetros.
3. O Service verifica o `node-cache`.
4. Se não estiver em cache, o Service busca na API externa (IBGE, etc.), formata e salva em cache.
5. O dado retorna ao Front-end e é renderizado em um card.

## Temas
O tema (claro/escuro) é controlado pela classe `.dark-mode` no `<html>`. O estado é persistido no `localStorage` com a chave `lupa-tema`.
