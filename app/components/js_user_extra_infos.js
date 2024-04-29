import { Icone } from './js_icone.js'
import { ComponenteHTML } from './js_componente_html.js'

/**
 * Cria a área de informações extras do usuário
 * @param {ComponenteHTML} oAside
 * @param {Object} oUser
 * @returns {ComponenteHTML}
 */
export function criaUserExtraInfos(oAside, oUser) {
  const oExtraInfos = new ComponenteHTML('article')
  oExtraInfos
    .addClass('estrutura-container-user-extra-infos')
    .appendTo(oAside.getObj())

  const oListInfo = new ComponenteHTML('ul')
  oListInfo
    .addClass('estrutura-container-user-list-info')
    .appendTo(oExtraInfos.getObj())

  function criaItemLista(sIcon, sText) {
    const oItem = new ComponenteHTML('li')
    oItem
      .addClass('estrutura-container-user-list-info-item')
      .appendTo(oListInfo.getObj())
    const oIcon = new ComponenteHTML('img')
    oIcon
      .addClass('estrutura-container-user-list-info-item-icon')
      .setAtributos({
        src: sIcon,
        alt: 'ícone de ' + sText
      })
      .appendTo(oItem.getObj())
    const oText = new ComponenteHTML('span')
    oText
      .addClass('estrutura-container-user-list-info-item-text')
      .text(sText)
      .appendTo(oItem.getObj())
    return oItem
  }

  if (oUser.company) {
    criaItemLista(Icone.company, oUser.company)
  }
  if (oUser.location) {
    criaItemLista(Icone.location, oUser.location)
  }
  if (oUser.blog) {
    criaItemLista(Icone.blog, oUser.blog)
  }

  /**
   * @TODO Fazer pro ícone de twitter, ajustar data do user e pegar svg do twitter
   */
  return oExtraInfos
}
