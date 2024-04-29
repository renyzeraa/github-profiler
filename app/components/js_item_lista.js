import { ComponenteHTML } from './js_componente_html.js'

/**
 * Cria um item de lista
 * @param {Object} oData
 * @param {String} oData.title - Conteúdo a ser apresentado na lista
 * @param {String} oData.value - valor do item
 */
export function ItemLista(oData) {
  const oItem = new ComponenteHTML('li')
  oItem.addClass('filter-item-list').text(oData.title)
  const oInput = new ComponenteHTML('input')
  oInput
    .addClass('checkbox-filter')
    .setAtributos({
      type: 'checkbox',
      name: oData.value
    })
    .prependTo(oItem.getObj())
  oItem.on('click', e => {
    oInput.setAtributo('checked', !oInput.getAtributo('checked'))
  })
  return oItem
}
