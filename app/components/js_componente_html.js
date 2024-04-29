/**
 * Cria componente html
 * @param {String} sElement - tipo do elemento (ul, span, etc..)
 * @returns
 */
export function ComponenteHTML(sElement) {
  this.obj
  this.nome
  this.aOnRemove = null

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
   * @returns {ComponenteHTML}
   */
  this.addClass = function (sClass) {
    this.getObj().classList.add(sClass)
    return this
  }

  /**
   * Retorna se elemento possuí esta classe
   * @param {String} sClass
   * @returns {Boolean}
   */
  this.hasClass = function (sClass) {
    return this.getObj().classList.contains(sClass)
  }

  /**
   * Remove uma classe do componente
   * @param {String} sClass
   * @returns {ComponenteHTML}
   */
  this.removeClass = function (sClass) {
    this.getObj().classList.remove(sClass)
    return this
  }

  /**
   * Define um estilo css ao componente
   * @param {String} sProp
   * @param {String} xVal
   * @returns {ComponenteHTML}
   */
  this.setStyleProp = function (sProp, sVal) {
    this.getObj().style.setProperty(sProp, sVal)
    return this
  }

  /**
   * Define um atributo para o componente
   * @param {String} sProp
   * @param {Number|Boolean|Object} xValue
   * @returns {ComponenteHTML}
   */
  this.setAtributo = function (sProp, xValue) {
    this.getObj().setAttribute(sProp, xValue)
    return this
  }

  /**
   * Define um objeto de atributos ao componente
   * @param {Object} oAttr
   * @returns {ComponenteHTML}
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
   * @returns {ComponenteHTML}
   */
  this.removeAtributo = function (sAttr) {
    this.getObj().removeAttribute(sAttr)
    return this
  }

  /**
   * Oculta o componente
   * @returns {ComponenteHTML}
   */
  this.hide = function () {
    this.getObj().style.display = 'none'
    return this
  }

  /**
   * Mostra o componente
   * @returns {ComponenteHTML}
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

  /**
   * Ativa um eventos do componente
   * @param {String} sEvent
   * @returns {ComponenteHTML}
   */
  this.trigger = function (sEvent) {
    this.getObj().dispatchEvent(
      new Event(sEvent, {
        bubbles: true,
        cancelable: true
      })
    )
    return this
  }

  /**
   * Foca no elemento
   */
  this.focus = function () {
    this.getObj().focus()
    return this
  }

  /**
   * Remove todos os elementos filhos de um elemento
   * @returns
   */
  this.removeFilhos = function () {
    const oObj = this.getObj()
    for (let oChild of oObj.children) {
      oChild.remove()
    }
    return this
  }

  /**
   * Ao remover o componente aciona a função
   * @param {Function} fn
   */
  this.onRemove = function (fn) {
    if (!this.aOnRemove) {
      this.aOnRemove = []
    }
    this.aOnRemove.push(fn)
  }

  /**
   * Remove o elemento do DOM
   * @returns {ComponenteHTML}
   */
  this.remove = function () {
    if (this.aOnRemove) {
      this.aOnRemove.forEach(fn => {
        fn()
      })
    }
    this.getObj().remove()
    return this
  }

  /**
   * Retorna o valor do elemento
   * @returns {String|Number}
   */
  this.getValor = function () {
    return this.getObj().value
  }

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
   * Adiciona texto a um elemento HTML como um nó de texto.
   * @param {String} sText
   * @returns {ComponenteHTML}
   */
  this.appendText = function (sText) {
    this.getObj().appendChild(document.createTextNode(sText))
    return this
  }

  /**
   * Retorna o elemento anterior
   * @returns {HTMLElement|null}
   */
  this.prev = function () {
    return this.getObj().previousElementSibling
  }

  /**
   * Retorna o primeiro filho do elemento html
   * @returns {HTMLElement|null}
   */
  this.first = function () {
    const oObj = this.getObj()
    if (oObj.children.length > 0) {
      return oObj.children[0]
    }
    return null
  }

  /**
   * Cria elemento html
   */
  function _init() {
    this.criaObjeto(sElement)
  }
  _init.apply(this)
  return this
}
