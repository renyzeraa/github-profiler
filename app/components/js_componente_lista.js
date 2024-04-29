import { ComponenteHTML } from './js_componente_html.js'
import { DataCell } from './../hooks/js_data_cell.js'
import { Icone } from './js_icone.js'
import { ItemLista } from './js_item_lista.js'

/**
 * Cria a lista de filtros
 * @param {Number} iType
 * @param {Array} aItens
 * @param {Function} fnOnClick
 * @returns {ListaFiltros}
 */
export function ListaFiltros(iType, aItens, fnOnClick) {
  const aLista = []

  const oListaPesquisa = new ComponenteHTML('div')
  oListaPesquisa
    .addClass('estrutura-context-list-filter')
    .setAtributo('data-tipo', iType)
  // titulo e botão de fechar
  const oHeader = new ComponenteHTML('header')
  oHeader
    .addClass('estrutura-data-container-header')
    .appendTo(oListaPesquisa.getObj())
  const oTitulo = new ComponenteHTML('h2')
  const sTitulo =
    iType === DataCell.TIPO_PESQUISA.LANGUAGE ? 'Language' : 'Type'
  oTitulo
    .addClass('estrutura-data-container-header-title')
    .text(sTitulo)
    .appendTo(oHeader.getObj())
  const oFechar = new ComponenteHTML('button')
  oFechar
    .on('click', e => {
      oListaPesquisa.remove()
    })
    .addClass('estrutura-data-container-header-close')
    .appendTo(oHeader.getObj())
  const oIcon = new ComponenteHTML('img')
  oIcon
    .setAtributos({
      src: Icone.close,
      alt: 'ícone de fechar menu de filtros'
    })
    .appendTo(oFechar.getObj())

  const oList = new ComponenteHTML('ul')
  oList
    .addClass('estrutura-data-container-filter-list')
    .appendTo(oListaPesquisa.getObj())

  aItens.forEach(oDados => {
    const oItem = new ItemLista(oDados)
    aLista.push(oItem)
    oItem.on('click', () => {
      fnOnClick(oListaPesquisa)
    })
    oItem.appendTo(oList.getObj())
  })

  /**
   * Retorna os valores selecionados da lista
   * @returns {Array}
   */
  oListaPesquisa.getValores = function () {
    const aVal = []
    aLista.forEach(oItem => {
      let oInput = oItem.first()
      if (oInput.instance) {
        oInput = oInput.instance
      }
      if (oInput.getAtributo('checked') === 'true') {
        aVal.push(oInput.getAtributo('name'))
      }
    })
    return aVal
  }

  /**
   * Define os valores da lista
   * @param {Array<string|number>} aVal
   */
  oListaPesquisa.setValores = function (aVal) {
    aLista.forEach(oItem => {
      let oInput = oItem.first()
      if (oInput.instance) {
        oInput = oInput.instance
      }
      if (aVal.includes(oInput.getAtributo('name'))) {
        oInput.setAtributo('checked', true)
      }
    })
  }

  return oListaPesquisa
}
