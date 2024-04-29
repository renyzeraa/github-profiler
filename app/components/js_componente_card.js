import { ComponenteHTML } from './js_componente_html.js'
import { Icone } from './js_icone.js'

/**
 * Representa um objeto de dados de um repositório do GitHub.
 * @typedef {Object} RepositorioGitHub
 * @property {number} id - O ID do repositório.
 * @property {string} title - O título formatado do repositório.
 * @property {string} description - A descrição do repositório.
 * @property {string} url - A URL do repositório no GitHub.
 * @property {number} stars - O número de estrelas do repositório.
 * @property {number} forks - O número de forks do repositório.
 * @property {number} watchers - O número de observadores do repositório.
 * @property {string} language - A linguagem de programação do repositório.
 * @property {number} open_issues - O número de problemas abertos do repositório.
 * @property {boolean} archived - Indica se o repositório está arquivado.
 * @property {boolean} starred - Indica se o usuário logado estrelou o repositório.
 */

/**
 * Cria o card do repositório
 * @param {RepositorioGitHub} oData
 */
export function Card(oData) {
  const oBase = new ComponenteHTML('article')
  oBase
    .setAtributos({
      'data-id': oData.id,
      title: `Clique aqui para abrir o repositório ${oData.title}`
    })
    .addClass('estrutura-data-card-item')
    .on('click', e => {
      const sUrl = oData.url
      window.open(sUrl, '_blank')
    })
  // titulo
  const oTitle = new ComponenteHTML('h2')
  oTitle
    .addClass('estrutura-data-card-title')
    .text(oData.title)
    .appendTo(oBase.getObj())
  // descrição
  const oDescription = new ComponenteHTML('p')
  oDescription
    .addClass('estrutura-data-card-description')
    .text(oData.description)
    .appendTo(oBase.getObj())
  // reputação
  const oDivReputation = new ComponenteHTML('div')
  oDivReputation
    .addClass('estrutura-data-card-reputation')
    .appendTo(oBase.getObj())
  const oReputation = new ComponenteHTML('span')
  oReputation.appendTo(oDivReputation.getObj())

  if (oData.starred) {
    oDivReputation.addClass('starred')
    oReputation.text(oData.language)
  } else {
    const oIconStarFilled = new ComponenteHTML('img')
    oIconStarFilled
      .setAtributos({
        src: Icone.starred,
        alt: 'ícone de favoritado'
      })
      .appendTo(oReputation.getObj())
      .addClass('estrutura-data-card-reputation-info')
    oReputation
      .addClass('estrutura-data-card-reputation-info')
      .appendText(oData.stars)
  }
  // forks
  const oForks = new ComponenteHTML('span')
  const oIconForks = new ComponenteHTML('img')
  oIconForks
    .setAtributos({
      src: Icone.forks,
      alt: 'ícone de ramificação'
    })
    .appendTo(oForks.getObj())
  oForks
    .addClass('estrutura-data-card-reputation-info')
    .appendText(String(oData.forks))
    .appendTo(oDivReputation.getObj())

  return oBase
}
