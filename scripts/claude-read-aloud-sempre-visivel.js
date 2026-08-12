/**
 * claude.ai — Barra de ações sempre visível + botão "Ler em voz alta" gigante
 *
 * O que faz:
 *   1. Mantém a linha de ações de cada mensagem (copiar, ler em voz alta,
 *      curtir, etc.) SEMPRE visível, sem depender do hover do mouse.
 *   2. Aumenta consideravelmente o botão "Ler em voz alta"
 *      (data-testid="action-bar-read-aloud"): 56x56 px, ícone de 36 px,
 *      com fundo destacado para ser fácil de achar e clicar.
 *
 * Como usar:
 *   - Abra o claude.ai, pressione F12 (Console) e cole este script inteiro; OU
 *   - Instale como userscript no Tampermonkey/Violentmonkey (match: https://claude.ai/*).
 *
 * O script injeta apenas CSS e re-injeta automaticamente se a página
 * (SPA) remover o <style> durante a navegação.
 */
(function () {
  'use strict';

  var STYLE_ID = 'cadu-read-aloud-boost';

  var CSS = [
    /* ---- 1. Linha de ações sempre visível ---------------------------- */
    /* A barra usa data-reveal="fade" e some quando o mouse sai da        */
    /* mensagem. Forçamos opacidade/visibilidade total o tempo todo.      */
    '[data-cds="MessageActions"],',
    '[data-cds="MessageActions"] * {',
    '  opacity: 1 !important;',
    '  visibility: visible !important;',
    '}',
    '[data-cds="MessageActions"] {',
    '  pointer-events: auto !important;',
    '  transition: none !important;',
    '}',
    /* Alguns wrappers controlam o fade pelo pai (group-hover). Cobrimos  */
    /* qualquer ancestral direto que esteja com opacidade zerada.         */
    ':has(> [data-cds="MessageActions"]) {',
    '  opacity: 1 !important;',
    '  visibility: visible !important;',
    '}',

    /* ---- 2. Botão "Ler em voz alta" bem maior ------------------------ */
    'button[data-testid="action-bar-read-aloud"] {',
    '  width: 56px !important;',
    '  height: 56px !important;',
    '  min-width: 56px !important;',
    '  min-height: 56px !important;',
    '  border-radius: 12px !important;',
    '  background: rgba(120, 90, 255, 0.12) !important;',
    '  box-shadow: inset 0 0 0 2px rgba(120, 90, 255, 0.45) !important;',
    '  color: inherit !important;',
    '}',
    'button[data-testid="action-bar-read-aloud"]:hover {',
    '  background: rgba(120, 90, 255, 0.25) !important;',
    '}',
    /* O tamanho do ícone vem de style inline (font-size: 16px);          */
    /* !important em stylesheet vence style inline sem !important.        */
    'button[data-testid="action-bar-read-aloud"] [data-cds="Icon"] {',
    '  font-size: 36px !important;',
    '  width: 1em !important;',
    '  height: 1em !important;',
    '}',
    /* Dá um respiro vertical para a barra não cortar o botão maior.      */
    '[data-cds="MessageActions"] {',
    '  min-height: 56px !important;',
    '  align-items: center !important;',
    '}'
  ].join('\n');

  function inject() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  inject();

  // O claude.ai é uma SPA: garante que o <style> sobreviva a re-renders.
  new MutationObserver(function () {
    if (!document.getElementById(STYLE_ID)) inject();
  }).observe(document.documentElement, { childList: true, subtree: true });

  console.log('[cadu] Barra de ações sempre visível + botão de leitura ampliado ✔');
})();
