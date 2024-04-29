import { ComponenteHTML } from './js_componente_html.js'
import { oRoot } from './js_root.js'

/**
 * Cria componente de loading do site
 * @param {String} sTitle - Caso queira descrever o que esta carregando
 * @returns {Loading}
 */
export function Loading(sDescricao) {
  this.loading
  this.descricao
  let isLoading = false

  function init() {
    this.iniciaLoading(sDescricao)
  }

  /**
   * Inicia o componente de loading;
   */
  this.iniciaLoading = function (sTitle = '') {
    this.loading = new ComponenteHTML('div')
    this.loading.addClass('estrutura-loading-overlay').appendTo(oRoot)
    const oSpinner = new ComponenteHTML('div')
    oSpinner
      .addClass('estrutura-loading-spinner')
      .appendTo(this.loading.getObj())
    this.descricao = new ComponenteHTML('span')
    this.descricao
      .addClass('estrutura-loading-text')
      .text(sTitle != '' ? sTitle : 'Carregando')
      .appendTo(this.loading.getObj())
    isLoading = true
  }

  /**
   * Remover o loading
   */
  this.removeLoading = function () {
    this.loading.getObj().remove()
    this.loading = null
    this.descricao = null
    isLoading = false
  }

  /**
   * Define um texto para o loading
   * @param {String} sText
   * @returns {Loading}
   */
  this.setText = function (sText) {
    this.descricao.text(sText)
    return this
  }

  /**
   * Retorna se esta realizando o loading
   */
  this.isLoading = function () {
    return isLoading
  }

  init.apply(this)
  return this
}
