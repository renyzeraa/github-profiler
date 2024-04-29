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
  const oListaPesquisa = new ComponenteHTML('div')
  oListaPesquisa.addClass('estrutura-context-list-filter')
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
    oItem.on('click', fnOnClick)
    oItem.appendTo(oList.getObj())
  })

  return oListaPesquisa
}
