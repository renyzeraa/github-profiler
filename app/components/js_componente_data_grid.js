import { ComponenteGridCards } from './js_componente_grid_cards.js'
import { DataCell } from './../hooks/js_data_cell.js'
import { Card } from './js_componente_card.js'

/**
 * Responsável pela manipulação do componente grid e cards
 * @param {String} sId
 * @param {DataCell} oUserData
 * @returns {ComponenteGridCards}
 */
export function DataGrid(sId, oUserData) {
  this.grid = new ComponenteGridCards(sId)
  this.cards = []
  let aCards
  if (sId === DataCell.TIPO_REPOSITORIO.REPOSITORIO) {
    aCards = oUserData.getRepositories()
  } else if (sId === DataCell.TIPO_REPOSITORIO.FAVORITO) {
    aCards = oUserData.getStarreds()
  }
  aCards.forEach(oData => {
    const oCard = new Card(oData)
    this.cards.push(oCard)
    oCard.appendTo(this.grid.obj.getObj())
  })
  return this
}
