/**
 * Classe base de construção de um componente
 * @param {String} sTipo
 * @param {String} sName
 * @returns {Componente}
 */
window['Componente'] = function (sTipo, sName) {
  this.obj
  this.nome

  /**
   * Insere depois o componente a um alvo
   * @param {HTMLElement} oAlvo
   * @returns {HTMLElement}
   */
  this.appendTo = function (oAlvo) {
    oAlvo.append(this.getObj())
    return this
  }

  /**
   * Insere antes o componente a um alvo
   * @param {HTMLElement} oAlvo
   * @returns {HTMLElement}
   */
  this.prependTo = function (oAlvo) {
    oAlvo.prepend(this.getObj())
    return this.getObj()
  }

  /**
   * Cria o elemento HTML
   * @param {String} sTipo
   */
  this.criaObjeto = function (sTipo) {
    this.obj = document.createElement(sTipo)
    this.obj.instance = this
    return this
  }

  /**
   * Define uma classe para o componente
   * @param {String} sClass
   * @returns {Componente}
   */
  this.addClass = function (sClass) {
    this.getObj().classList.add(sClass)
    return this
  }

  /**
   * Remove uma classe do componente
   * @param {String} sClass
   * @returns {Componente}
   */
  this.removeClass = function (sClass) {
    this.getObj().classList.remove(sClass)
    return this
  }

  /**
   * Define um atributo para o componente
   * @param {String} sProp
   * @param {Number|Boolean|Object} xValue
   * @returns {Componente}
   */
  this.setAtributo = function (sProp, xValue) {
    this.getObj().setAttribute(sProp, xValue)
    return this
  }

  /**
   * Define um objeto de atributos ao componente
   * @param {Object} oAttr
   * @returns {Componente}
   */
  this.setAtributos = function (oAttr) {
    Object.keys(oAttr).forEach(sProp => {
      this.setAtributo(sProp, oAttr[sProp])
    })
    return this
  }

  /**
   * Retorna o valor de um atributo do componente
   * @param {String} sAttr
   */
  this.getAtributo = function (sAttr) {
    return this.getObj().getAttribute(sAttr)
  }

  /**
   * Remove determinado atributo do componente
   * @param {String} sAttr
   * @returns {Componente}
   */
  this.removeAtributo = function (sAttr) {
    this.getObj().removeAttribute(sAttr)
    return this
  }

  /**
   * Oculta o componente
   * @returns {Componente}
   */
  this.hide = function () {
    this.getObj().style.display = 'none'
    return this
  }

  /**
   * Mostra o componente
   * @returns {Componente}
   */
  this.show = function () {
    this.getObj().style.display = ''
    return this
  }

  /**
   * Retorna o elemento html principal
   * @returns {HTMLElement}
   */
  this.getObj = function () {
    return this.obj
  }

  /**
   * Retorna o nome do componente
   * @returns {String}
   */
  this.getNome = function () {
    return this.nome
  }

  /**
   * Define um evento a ser disparado no componente
   * @param {String} sEvent
   * @param {Function} oFn
   */
  this.on = function (sEvent, oFn) {
    this.getObj().addEventListener(sEvent, oFn)
    return this
  }

  return this
}

window['ComponenteHTML'] = function (sElement) {
  /**
   * Define o texto do componente
   * @param {String} sText
   * @returns {ComponenteHTML}
   */
  this.text = function (sText) {
    this.getObj().textContent = sText
    return this
  }

  /**
   * Cria elemento html
   */
  function _init() {
    Componente.apply(this)
    this.criaObjeto(sElement)
  }
  _init.apply(this)
  return this
}
ComponenteHTML.prototype = Object.create(Componente.prototype)

window['oRoot'] = document.querySelector('.estrutura')

function criaHeader() {
  const oHeader = new ComponenteHTML('header')
  oHeader.addClass('estrutura-header').appendTo(oRoot)

  const oDivItens = new ComponenteHTML('div')
  oDivItens
    .addClass('estrutura-header-itens')
    .addClass('container-global')
    .appendTo(oHeader.getObj())

  const oLogo = new ComponenteHTML('img')
  oLogo
    .addClass('estrutura-header-logo')
    .appendTo(oDivItens.getObj())
    .setAtributos({
      src: './app/assets/logo_github.svg',
      alt: 'logo github'
    })

  const oSeparator = new ComponenteHTML('span')
  oSeparator
    .addClass('estrutura-header-separator')
    .text('/')
    .appendTo(oDivItens.getObj())

  const oSubject = new ComponenteHTML('span')
  oSubject
    .addClass('estrutura-header-subject')
    .text('Profile')
    .appendTo(oDivItens.getObj())
}

function iniciaSistema() {
  criaHeader()
}
iniciaSistema()
