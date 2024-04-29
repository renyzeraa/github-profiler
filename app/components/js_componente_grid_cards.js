import { ComponenteHTML } from './js_componente_html.js'

/**
 * Cria a section dos cards
 * @param {String} sId - identificador de grid dos cards
 * @returns {ComponenteGridCards}
 */
export function ComponenteGridCards(sId) {
  this.id = sId
  this.obj

  function init() {
    this.obj = new ComponenteHTML('section')
    this.obj
      .addClass('estrutura-data-container-cards')
      .setAtributo('data-id', sId)
  }

  /**
   * Destrói o componente
   */
  this.destroy = function () {
    this.obj.remove()
    this.obj = null
  }

  init.apply(this)

  return this
}
