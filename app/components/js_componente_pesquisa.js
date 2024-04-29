import { DataCell } from '../hooks/js_data_cell.js'
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs'

/**
 * Componente que realiza a pesquisa
 */
export function ComponentePesquisa() {
  this.data
  this.tipoRepositorio
  this.selecao = {
    type: [],
    language: []
  }
  this.conteudoPesquisa = ''

  /**
   * Define o tipo de repositório selecionado
   * @param {Number} iType
   * @returns {ComponentePesquisa}
   */
  this.setTipoRepositorio = function (iType) {
    this.tipoRepositorio = iType
    this.limpaSelecao(0, true)
    return this
  }

  /**
   * Retorna o tipo de repositório selecionado
   * @returns {Number}
   */
  this.getTipoRepositorio = function () {
    return this.tipoRepositorio
  }

  /**
   * Define o texto digitado no campo de pesquisa
   * @param {String} sText
   */
  this.setTextoPesquisa = function (sText) {
    this.conteudoPesquisa = sText
  }

  /**
   * Retorna o texto digitado no campo de pesquisa
   * @returns {String}
   */
  this.getConteudoPesquisa = function () {
    return this.conteudoPesquisa
  }

  /**
   * Aplica os filtros definidos devolvendo o array filtrado
   * @param {Number} iType
   * @returns
   */
  this.aplicaFiltros = function () {
    if (this.data) {
      const sType = this.getTipoRepositorio()
      let aRepos = []
      if (DataCell.TIPO_REPOSITORIO.FAVORITO === sType) {
        aRepos = this.data.getStarreds()
      } else if (DataCell.TIPO_REPOSITORIO.REPOSITORIO === sType) {
        aRepos = this.data.getRepositories()
      }
      return this.filtraRepositorios(aRepos)
    }
    return false
  }

  /**
   * Filtra os repositorios com base nos itens da listas, se selecionados, e caso seja digitado no campo de pesquisa
   * @param {Array} aRepos
   * @returns {Array|Promise}
   */
  this.filtraRepositorios = function (aRepos) {
    const aLang = this.getSelecaoLang()
    const aType = this.getSelecaoType()
    aRepos = aRepos.filter(oRepo => {
      if (aLang.length) {
        if (!oRepo.language) {
          return false
        }
        if (!aLang.includes(oRepo.language.toLowerCase())) {
          return false
        }
      }
      if (aType.length) {
        if (
          aType.some(sVal => sVal == DataCell.FILTRO_TIPO.FORKS) &&
          !oRepo.forks
        ) {
          return false
        }
        if (
          aType.some(sVal => sVal == DataCell.FILTRO_TIPO.ARCHIVED) &&
          !oRepo.archived
        ) {
          return false
        }
        if (
          aType.some(sVal => sVal == DataCell.FILTRO_TIPO.MIRROR) &&
          !oRepo.mirror
        ) {
          return false
        }
      }
      return true
    })
    const sPesquisa = this.getConteudoPesquisa()
    if (sPesquisa !== '') {
      const oFuseOptions = {
        threshold: 0.25,
        keys: ['title', 'description']
      }
      const fuse = new Fuse([], oFuseOptions)
      fuse.setCollection(aRepos)
      return new Promise((res, rej) => {
        const aResponse = fuse.search(sPesquisa).map(oRes => {
          return oRes.item
        })
        return res(aResponse)
      })
    }
    return aRepos
  }

  /**
   * Define todos os dados a serem
   * @param {DataCell} oData
   * @returns {ComponentePesquisa}
   */
  this.setData = function (oData) {
    this.data = oData
    return this
  }

  /**
   * Remove os filtros de seleção das listas
   * @returns {ComponentePesquisa}
   */
  this.limpaSelecao = function (iType, bAll) {
    if (bAll) {
      this.selecao = {
        type: [],
        language: []
      }
    } else if (DataCell.TIPO_PESQUISA.TYPE === iType) {
      this.selecao.type = []
    } else if (DataCell.TIPO_PESQUISA.LANGUAGE === iType) {
      this.selecao.language = []
    }
    return this
  }

  /**
   * Seta os valores selecionados na lista
   * @param {Number} iTipoLista
   * @param {Array} aLista
   */
  this.setSelecao = function (iTipoLista, aLista) {
    if (DataCell.TIPO_PESQUISA.TYPE === iTipoLista) {
      this.selecao.type = aLista
    } else if (DataCell.TIPO_PESQUISA.LANGUAGE === iTipoLista) {
      this.selecao.language = aLista
    }
  }

  /**
   * Retorna as selecoes de filtro de linguagens
   * @returns {Array}
   */
  this.getSelecaoLang = function () {
    return this.selecao.language
  }

  /**
   * Retorna as selecoes de filtro de tipo
   * @returns {Array}
   */
  this.getSelecaoType = function () {
    return this.selecao.type
  }

  return this
}
