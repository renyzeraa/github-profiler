import { ComponenteHTML } from './js_componente_html.js'
import { oRoot } from './js_root.js'

/**
 * Cria área de fixar contextos flutuantes como as listas de pesquisa
 * @returns {ComponenteHTML}
 */
export function criaAreaContext() {
  const oAreaContext = new ComponenteHTML('section')
  oAreaContext.addClass('estrutura-context-container').appendTo(oRoot)
  return oAreaContext
}
