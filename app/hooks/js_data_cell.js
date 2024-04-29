/**
 * Classe base de dados do sistema
 * @returns DataCell
 */
export function DataCell() {
  this.user = null
  this.repositories = []
  this.starreds = []
  this.languages = {
    starreds: [],
    repositories: []
  }

  /**
   * Define os repositories do usuário
   * @param {Array} aRepos
   * @returns {DataCell}
   */
  this.setRepositories = function (aRepos) {
    this.repositories = aRepos
    this.filterLanguages(aRepos, false)
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
    this.filterLanguages(aStarreds, true)
    return this
  }

  /**
   * Filtra as linguagens presente dentro de um array de repositórios
   * @param {Array<RepositorioGitHub>} aRepo
   * @param {Boolean} bStarred
   */
  this.filterLanguages = function (aRepo, bStarred) {
    const aLanguages = []
    aRepo.forEach(oRepo => {
      if (!aLanguages.includes(oRepo.language) && oRepo.language !== null) {
        aLanguages.push(oRepo.language)
      }
    })
    if (bStarred) {
      this.languages.starreds = aLanguages
    } else {
      this.languages.repositories = aLanguages
    }
  }

  /**
   * Retorna os repositórios favoritados do usuário
   * @returns {Array}
   */
  this.getStarreds = function () {
    return this.starreds
  }

  /**
   * Retorna a quantidade de repositórios favoritos
   * @returns {Number}
   */
  this.getAmountStarreds = function () {
    return this.starreds.length
  }

  /**
   * Retorna a quantidade de repositórios
   * @returns {Number}
   */
  this.getAmountRepositories = function () {
    return this.repositories.length
  }

  /**
   * Retorna array de linguagens com base no repositório desejado
   * @param {String} sTipo
   * @returns {Array}
   */
  this.getLanguages = function (sTipo) {
    if (sTipo == DataCell.TIPO_REPOSITORIO.REPOSITORIO) {
      return this.languages.repositories
    }
    if (sTipo === DataCell.TIPO_REPOSITORIO.FAVORITO) {
      return this.languages.starreds
    }
    return []
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

/**
 * Constante que define os tipos de repositório para uma célula de dados.
 * @readonly
 * @enum {string}
 */
DataCell.TIPO_REPOSITORIO = {
  /**
   * Tipo de repositório para um repositório comum.
   * @type {string}
   */
  REPOSITORIO: 'repository',
  /**
   * Tipo de repositório para um repositório favoritado.
   * @type {string}
   */
  FAVORITO: 'starred'
}
/**
 * Constante que define os tipos de pesquisa para uma célula de dados.
 * @readonly
 * @enum {number}
 */
DataCell.TIPO_PESQUISA = {
  /**
   * Tipo de pesquisa por tipo.
   * @type {number}
   */
  TYPE: 1,
  /**
   * Tipo de pesquisa por linguagem.
   * @type {number}
   */
  LANGUAGE: 2
}
/**
 * Constante que define os tipos de filtros para pesquisar repositórios.
 * @readonly
 * @type {Array<{ value: number, title: string }>}
 */
DataCell.FILTRO_TIPOS = [
  /**
   * Filtro para fontes.
   * @type {Object}
   * @property {number} value - O valor do filtro.
   * @property {string} title - O título do filtro.
   */
  {
    value: 1,
    title: 'Sources'
  },
  /**
   * Filtro para forks.
   * @type {Object}
   * @property {number} value - O valor do filtro.
   * @property {string} title - O título do filtro.
   */
  {
    value: 2,
    title: 'Forks'
  },
  /**
   * Filtro para repositórios arquivados.
   * @type {Object}
   * @property {number} value - O valor do filtro.
   * @property {string} title - O título do filtro.
   */
  {
    value: 3,
    title: 'Archived'
  },
  /**
   * Filtro para repositórios espelhados.
   * @type {Object}
   * @property {number} value - O valor do filtro.
   * @property {string} title - O título do filtro.
   */
  {
    value: 4,
    title: 'Mirrors'
  }
]
