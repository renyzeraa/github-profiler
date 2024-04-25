function ComponenteBase() {
  this.obj
  this.mobile = false

  /**
   * Define se é mobile
   * @param {Boolean} bMobile
   */
  this.setMobile = function (bMobile) {
    this.mobile = bMobile
  }

  /**
   * Retorna se é mobile
   * @returns {Boolean}
   */
  this.getMobile = function () {
    return this.mobile
  }

  /**
   * Retorna o objeto
   * @returns {Object}
   */
  this.getObj = function () {
    return this.obj
  }

  /**
   * Define o objeto
   * @param {Object} obj
   */
  this.criaObject = function (sTipo) {
    this.obj = document.createElement(sTipo)
  }
}

export default function Header() {
  this.mobile = false

  /**
   *
   */
  function init() {
    this.createElements()
  }

  this.createElements = function () {
    this.obj = document.createElement('nav')

    // conteúdo do nav
    const oNavContent = document.createElement('div')
    this.obj.append(oNavContent)
    oNavContent.classList.add('nav-github')

    // logo git-hub
    const oLogo = document.createElement('span')
    oLogo.classList.add('nav-content')
    oNavContent.append(oLogo)

    // separador
    const oSeparator = document.createElement('span')
    oSeparator.classList.add('logo-github')
    oNavContent.append(oSeparator)

    // nome da página atual
    const oNamePage = document.createElement('span')
    oNamePage.classList.add('log-github')
    oNavContent.append(oNamePage)
  }

  init.apply(this)

  return this
}
