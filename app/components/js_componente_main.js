import { ComponenteHTML } from './js_componente_html.js'
import { oRoot } from './js_root.js'

/**
 * Cria o elemento main principal do site
 * @returns {ComponenteHTML}
 */
export function criaMain() {
  const oMain = new ComponenteHTML('main')
  oMain
    .addClass('estrutura-container')
    .addClass('container-global')
    .appendTo(oRoot)
  return oMain
}
