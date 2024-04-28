/**
 * Classe base de construção de um componente
 * @param {String} sTipo
 * @param {String} sName
 * @returns {Componente}
 */
function Componente() {
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

/**
 * Cria componente html
 * @param {String} sElement - tipo do elemento (ul, span, etc..)
 * @returns
 */
function ComponenteHTML(sElement) {
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

/**
 * Cria componente de loading do site
 * @param {String} sTitle - Caso queira descrever o que esta carregando
 * @returns {Loading}
 */
function Loading(sTitle) {
  this.loading
  this.descricao
  let isLoading = false

  function init() {
    this.iniciaLoading()
  }

  /**
   * Inicia o componente de loading;
   */
  this.iniciaLoading = function () {
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

/**
 * Classe base de dados do sistema
 * @returns DataCell
 */
function DataCell() {
  this.user = null
  this.repositories = []
  this.starreds = []

  /**
   * Define os repositories do usuário
   * @param {Array} aRepos
   * @returns {DataCell}
   */
  this.setRepositories = function (aRepos) {
    this.repositories = aRepos
    return this
  }

  /**
   * Retorna os repositories do usuário
   * @returns {Array}
   */
  this.getRepositories = function () {
    return this.repositories
  }

  /**
   * Define os dados do usuário
   * @param {Array} oUser
   * @returns {DataCell}
   */
  this.setUser = function (oUser) {
    this.user = oUser
    return this
  }

  /**
   * Retorna os dados do usuário
   * @returns {Object}
   */
  this.getUser = function () {
    return this.user
  }

  /**
   * Define os repositórios favoritos do usuário
   * @param {Array} aStarreds
   * @returns {DataCell}
   */
  this.setStarreds = function (aStarreds) {
    this.starreds = aStarreds
    return this
  }

  /**
   * Retorna os repositórios favoritados do usuário
   * @returns {Array}
   */
  this.getStarreds = function () {
    return this.starreds
  }

  /**
   * Remove os dados do usuário
   */
  this.destroy = function () {
    this.user = null
    this.repositories = null
    this.starreds = null
  }

  return this
}

const oRoot = document.querySelector('.estrutura')

/**
 * Todos ícones disponíveis
 */
const Icone = {
  logo: './app/assets/logo_github.svg',
  chevron: './app/assets/icon_chevron_down.svg',
  company: './app/assets/icon_enterprise.svg',
  location: './app/assets/icon_pin_map.svg',
  blog: './app/assets/icon_chain.svg',
  bookmark: './app/assets/icon_bookmark.svg',
  star: './app/assets/icon_star.svg',
  search: './app/assets/icon_search.svg',
  starred: './app/assets/icon_star_filled.svg',
  forks: './app/assets/icon_branch_fork.svg'
}
/**
 * Realiza a busca dos dados do usuário seleciona na API do github
 * @param {String} sName - nome do usuário
 * @returns {Object}
 */
async function buscarDadosUsuarioGitHub(sName) {
  try {
    // repositories
    const responseRepos = await fetch(
      `https://api.github.com/users/${sName}/repos`
    )
    if (!responseRepos.ok) {
      throw new Error('Não foi possível obter os dados do usuário')
    }
    const aJsonRepos = await responseRepos.json()
    // starreds
    const responseStarreds = await fetch(
      `https://api.github.com/users/${sName}/starred`
    )
    if (!responseStarreds.ok) {
      throw new Error(
        'Não foi possível obter os repositórios favoritados do usuário'
      )
    }
    const aJsonStarreds = await responseStarreds.json()
    // user
    const responseUser = await fetch(`https://api.github.com/users/${sName}`)
    if (!responseStarreds.ok) {
      throw new Error(
        'Não foi possível obter os repositórios favoritados do usuário'
      )
    }
    const oUser = await responseUser.json()
    /**
     * Formata os dados recebidos no json para somente dados necessários
     * @param {Object} oData
     * @returns {Object}
     */
    function formatarDados(oData) {
      /**
       * Formata string remover hifens e capitaliza a primeira letra de cada palavra
       * @param {String} str
       * @returns
       */
      function formatarString(str) {
        return str.replace(/-/g, ' ').replace(/\b\w/g, function (match) {
          return match.toUpperCase()
        })
      }

      return {
        id: oData.id,
        title: formatarString(oData.name),
        description: oData.description,
        url: oData.html_url,
        stars: oData.stargazers_count,
        forks: oData.forks_count,
        watchers: oData.watchers_count,
        language: oData.language,
        open_issues: oData.open_issues_count,
        archived: oData.archived,
        starred: oUser.login !== oData.owner.login
      }
    }
    return {
      user: {
        avatar: oUser.avatar_url,
        nome: oUser.name,
        bio: oUser.bio,
        company: oUser.company,
        location: oUser.location,
        blog: oUser.blog,
        url: oUser.html_url,
        username: oUser.login
      },
      repos: aJsonRepos.map(formatarDados),
      starred: aJsonStarreds.map(formatarDados)
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do usuário:', error)
    return null
  }
}

/**
 * Cria o header principal do site
 */
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
      src: Icone.logo,
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

/**
 * Cria o elemento main principal do site
 * @returns {ComponenteHTML}
 */
function criaMain() {
  const oMain = new ComponenteHTML('main')
  oMain
    .addClass('estrutura-container')
    .addClass('container-global')
    .appendTo(oRoot)
  return oMain
}

/**
 * Cria a área de informações do usuário
 * @param {Object} oUser
 * @returns {ComponenteHTML}
 */
function criaUserProfile(oUser) {
  const oAside = new ComponenteHTML('aside')
  oAside.addClass('estrutura-container-user-profile')

  const oAvatar = new ComponenteHTML('div')
  oAvatar.addClass('estrutura-container-user-avatar').appendTo(oAside.getObj())

  const oImage = new ComponenteHTML('img')
  oImage
    .addClass('estrutura-container-user-avatar-image')
    .appendTo(oAvatar.getObj())
    .setAtributos({
      src: oUser.avatar,
      alt: 'Avatar do usuário'
    })

  const oName = new ComponenteHTML('h2')
  oName
    .addClass('estrutura-container-user-name')
    .text(oUser.nome)
    .appendTo(oAside.getObj())

  const oBio = new ComponenteHTML('span')
  oBio
    .addClass('estrutura-container-user-bio')
    .text(oUser.bio)
    .appendTo(oAside.getObj())

  const oBtnInfos = new ComponenteHTML('button')
  oBtnInfos
    .addClass('estrutura-container-user-button')
    .setAtributo('data-info-ativo', false)
    .appendTo(oAside.getObj())

  const oTextButton = new ComponenteHTML('span')
  oTextButton
    .addClass('estrutura-container-user-button-text')
    .text('Informações Adicionais')
    .appendTo(oBtnInfos.getObj())
  const oIconChevron = new ComponenteHTML('img')
  oIconChevron
    .addClass('estrutura-container-user-button-icon')
    .setAtributos({
      src: Icone.chevron,
      alt: 'ícone de abrir informações adicionais'
    })
    .appendTo(oBtnInfos.getObj())

  const oInfosExtras = criaUserExtraInfos(oAside, oUser)

  oBtnInfos.on('click', oEv => {
    const bAtivo = oBtnInfos.getAtributo('data-info-ativo') === 'true'
    if (bAtivo) {
      oInfosExtras.removeClass('active')
      oIconChevron.removeClass('active')
    } else {
      oInfosExtras.addClass('active')
      oIconChevron.addClass('active')
    }
    oBtnInfos.setAtributo('data-info-ativo', !bAtivo)
  })

  return oAside
}

/**
 * Cria a área de informações extras do usuário
 * @param {ComponenteHTML} oAside
 * @param {Object} oUser
 * @returns {ComponenteHTML}
 */
function criaUserExtraInfos(oAside, oUser) {
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
   * @TODO Fazer pro icone de twitter, ajustar data do user e pegar svg do twitter
   */

  return oExtraInfos
}

/**
 * Cria a área de filtros e definições de tipos de repositórios do usuário
 * @returns {Object}
 */
function criaAreaFiltros() {
  const oFilter = new ComponenteHTML('header')
  oFilter
    .addClass('estrutura-data-container')
    .addClass('estrutura-data-container-filter')
    .appendTo(oRoot)

  const oSelection = new ComponenteHTML('div')
  oSelection
    .addClass('estrutura-data-container-selection')
    .appendTo(oFilter.getObj())

  // repositories
  const oBtnRepo = new ComponenteHTML('button')
  oBtnRepo
    .addClass('estrutura-data-button')
    .addClass('type-repo')
    .appendTo(oSelection.getObj())
  const oContentBtnRepo = new ComponenteHTML('div')
  oContentBtnRepo
    .addClass('estrutura-data-button-content')
    .appendTo(oBtnRepo.getObj())
  const oIconRepo = new ComponenteHTML('img')
  oIconRepo
    .setAtributos({
      src: Icone.bookmark,
      alt: 'ícone de repositórios'
    })
    .appendTo(oContentBtnRepo.getObj())
  const oDescriptionRepo = new ComponenteHTML('span')
  oDescriptionRepo
    .addClass('estrutura-data-button-description')
    .text('Repositories')
    .appendTo(oContentBtnRepo.getObj())
  const oAmountRepo = new ComponenteHTML('span')
  oAmountRepo
    .addClass('estrutura-data-button-amount')
    .text('0')
    .appendTo(oContentBtnRepo.getObj())

  // starreds
  const oBtnStarred = new ComponenteHTML('button')
  oBtnStarred
    .addClass('estrutura-data-button')
    .addClass('type-starred')
    .appendTo(oSelection.getObj())
  const oContentBtnStarred = new ComponenteHTML('div')
  oContentBtnStarred
    .addClass('estrutura-data-button-content')
    .appendTo(oBtnStarred.getObj())
  const oIconStarred = new ComponenteHTML('img')
  oIconStarred
    .setAtributos({
      src: Icone.star,
      alt: 'ícone de estrela'
    })
    .appendTo(oContentBtnStarred.getObj())
  const oDescriptionStarred = new ComponenteHTML('span')
  oDescriptionStarred
    .addClass('estrutura-data-button-description')
    .text('Starred')
    .appendTo(oContentBtnStarred.getObj())
  const oAmountStarred = new ComponenteHTML('span')
  oAmountStarred
    .addClass('estrutura-data-button-amount')
    .text('0')
    .appendTo(oContentBtnStarred.getObj())

  // search area
  const oDivSearch = new ComponenteHTML('div')
  oDivSearch
    .addClass('estrutura-data-container-type-lang')
    .appendTo(oFilter.getObj())
  // filter type
  const oBtnFilterTypeLang = new ComponenteHTML('button')
  oBtnFilterTypeLang
    .addClass('estrutura-data-button-filter')
    .addClass('filter-type')
    .setAtributo(
      'title',
      'Clique aqui para aplicar filtro de preferência de tipo.'
    )
    .appendTo(oDivSearch.getObj())
  let oIconChevron = new ComponenteHTML('img')
  oIconChevron
    .addClass('estrutura-data-button-filter-icon')
    .setAtributos({
      src: Icone.chevron,
      alt: 'ícone de abrir'
    })
    .appendTo(oBtnFilterTypeLang.getObj())
  const oTitleType = new ComponenteHTML('span')
  oTitleType
    .addClass('estrutura-data-button-filter-type')
    .text('Type')
    .appendTo(oBtnFilterTypeLang.getObj())
  // filter language
  const oBtnFilterLang = new ComponenteHTML('button')
  oBtnFilterLang
    .addClass('estrutura-data-button-filter')
    .addClass('filter-language')
    .setAtributo(
      'title',
      'Clique aqui para aplicar filtro pelo linguagem de programação.'
    )
    .appendTo(oDivSearch.getObj())
  oIconChevron = new ComponenteHTML('img')
  oIconChevron
    .addClass('estrutura-data-button-filter-icon')
    .setAtributos({
      src: Icone.chevron,
      alt: 'ícone de abrir'
    })
    .appendTo(oBtnFilterLang.getObj())
  const oTitleLang = new ComponenteHTML('span')
  oTitleLang
    .addClass('estrutura-data-button-filter-type')
    .text('Language')
    .appendTo(oBtnFilterLang.getObj())
  // search
  const oBtnSearch = new ComponenteHTML('button')
  oBtnSearch
    .addClass('estrutura-data-button-filter')
    .addClass('search')
    .setAtributo('title', 'Clique aqui para pesquisar.')
    .appendTo(oDivSearch.getObj())
  const oIconSearch = new ComponenteHTML('img')
  oIconSearch
    .setAtributos({
      src: Icone.search,
      alt: 'ícone de pesquisar'
    })
    .appendTo(oBtnSearch.getObj())
  // input text search
  const oInputSearch = new ComponenteHTML('input')
  oInputSearch
    .addClass('estrutura-campo-filter')
    .setAtributos({
      type: 'text',
      placeholder: 'Search Here'
    })
    .appendTo(oDivSearch.getObj())

  return {
    obj: oFilter,
    repo: {
      button: oBtnRepo,
      amount: oAmountRepo
    },
    starred: {
      button: oBtnStarred,
      amount: oAmountStarred
    }
  }
}

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
function Card(oData) {
  const oBase = new ComponenteHTML('article')
  oBase
    .setAtributos({
      'data-id': oData.id,
      title: `Clique aqui para abrir o repositório ${oData.title}`
    })
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
    oReputation.text(oData.language)
  } else {
    const oIconStarFilled = new ComponenteHTML('img')
    oIconStarFilled
      .setAtributos({
        src: Icone.starred,
        alt: 'ícone de favoritado'
      })
      .appendTo(oReputation.getObj())
    oReputation
      .addClass('estrutura-data-card-reputation-info')
      .text(oData.stars)
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
    .text(oData.forks)
    .appendTo(oDivReputation.getObj())

  return oBase
}

/**
 * Cria a section dos cards
 * @param {String} sId - identificador de grid dos cards
 * @returns {ComponenteGridCards}
 */
function ComponenteGridCards(sId) {
  this.id = sId

  function init() {
    this.obj = new ComponenteHTML('section')
    this.obj
      .addClass('estrutura-data-container-cards')
      .setAtributo('data-id', sId)
  }
  init()

  /**
   * Destrói o componente
   */
  this.destroy = function () {
    this.obj.remove()
  }

  return this
}

/**
 *
 * @param {*} bInicial
 */
function criaAreaCards(sId) {}

/**
 * Inicia o sistema
 */
async function iniciaSistema() {
  const oLoading = new Loading('Carregando os dados')
  const oData = new DataCell()
  await buscarDadosUsuarioGitHub('renyzeraa')
    .then(oUserData => {
      if (oUserData) {
        oUserData.user && oData.setUser(oUserData.user)
        oUserData.repos && oData.setRepositories(oUserData.repos)
        oUserData.starred && oData.setStarreds(oUserData.starred)
      } else {
        console.error('Não foi possível obter os dados do usuário.')
      }
    })
    .finally(() => {
      oLoading.removeLoading()
    })
  // cria HTML da página
  criaHeader()
  const oMain = criaMain()
  // informações do usuário
  const oAside = criaUserProfile(oData.getUser())
  oAside.appendTo(oMain.getObj())
  // área de filtros
  const oFilter = criaAreaFiltros()
  oFilter.obj.appendTo(oMain.getObj())
  // área dos cards
  criaAreaCards(true)
}
iniciaSistema()
