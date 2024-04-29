import { DataCell } from './../hooks/js_data_cell.js'
import { ComponenteHTML } from './js_componente_html.js'
import { criaAreaFiltros } from './js_area_filtros.js'
import { criaAreaContext } from './js_componente_context.js'
import { DataGrid } from './js_componente_data_grid.js'
import { ListaFiltros } from './js_componente_lista.js'
import { ComponentePesquisa } from './js_componente_pesquisa.js'
import { Loading } from './js_componente_loading.js'

/**
 * Cria o componente e os comportamentos de filtros
 * Cria o contexto onde sera inserido a lista de filtros
 * @param {DataCell} oData
 * @param {ComponenteHTML} oMain
 * @param {ComponenteGridCards} oGrid
 */
export function ComponenteFiltros(oData, oMain, oGrid) {
  this.areaFiltros = null
  this.areaDados = null
  this.dadosUsuario = null
  this.main = null
  this.context = null
  this.pesquisa = null

  /**
   * inicia o componente
   */
  this.init = function (oDadosUsuario, oAlvo, oAreaDados) {
    this.dadosUsuario = oDadosUsuario
    this.pesquisa = new ComponentePesquisa()
    this.pesquisa.setData(this.dadosUsuario)
    this.areaFiltros = criaAreaFiltros(this.dadosUsuario)
    this.areaDados = oAreaDados
    this.main = oAlvo
    this.handleCamposFiltros()
    this.criaContextLista()
    this.criaComportamentosLista()
    this.handleSearch()
  }

  /**
   * Lida com os campos da area de filtros
   */
  this.handleCamposFiltros = function () {
    this.areaFiltros.repo.addClass('active')
    this.pesquisa.setTipoRepositorio(DataCell.TIPO_REPOSITORIO.REPOSITORIO)
    this.areaFiltros.repo.on('click', () => {
      if (this.areaFiltros.repo.hasClass('active')) {
        return
      }
      const oLoading = new Loading('Carregando repositórios')
      this.areaFiltros.repo.addClass('active')
      this.areaFiltros.starred.removeClass('active')
      this.areaDados.grid.destroy()
      this.pesquisa.setTipoRepositorio(DataCell.TIPO_REPOSITORIO.REPOSITORIO)
      this.areaDados = new DataGrid(
        DataCell.TIPO_REPOSITORIO.REPOSITORIO,
        this.dadosUsuario.getRepositories()
      )
      this.areaDados.grid.obj.appendTo(oMain.getObj())
      setTimeout(() => {
        oLoading.removeLoading()
      }, 120)
    })
    this.areaFiltros.starred.on('click', () => {
      if (this.areaFiltros.starred.hasClass('active')) {
        return
      }
      const oLoading = new Loading('Carregando repositórios favoritados')
      this.areaFiltros.starred.addClass('active')
      this.areaFiltros.repo.removeClass('active')
      this.areaDados.grid.destroy()
      this.pesquisa.setTipoRepositorio(DataCell.TIPO_REPOSITORIO.FAVORITO)
      this.areaDados = new DataGrid(
        DataCell.TIPO_REPOSITORIO.FAVORITO,
        this.dadosUsuario.getStarreds()
      )
      this.areaDados.grid.obj.appendTo(oMain.getObj())
      setTimeout(() => {
        oLoading.removeLoading()
      }, 120)
    })
    this.areaFiltros.obj.appendTo(oMain.getObj())
  }

  /**
   * Cria a area de contexto onde sera apresentado as listas
   */
  this.criaContextLista = function () {
    this.context = criaAreaContext()
    this.context.on('click', e => {
      if (
        (e.target.instance &&
          e.target.instance.hasClass('estrutura-data-container-filter-list')) ||
        (e.target.instance && e.target.instance.hasClass('filter-item-list')) ||
        (e.target.instance && e.target.instance.hasClass('checkbox-filter')) ||
        (e.target.instance &&
          e.target.instance.hasClass('estrutura-context-list-filter')) ||
        (e.target.instance &&
          e.target.instance.hasClass('estrutura-data-container-header-title'))
      ) {
        return
      }
      this.context.removeFilhos()
      this.context.removeClass('active')
    })
  }

  /**
   * Cria os comportamentos para os filtros do tipo type e language
   */
  this.criaComportamentosLista = function () {
    /**
     * Ao clicar no item da lista, defini novos filtros para pesquisa
     * @param {ListaFiltros} oLista
     */
    const fnOnClickItemLista = oLista => {
      this.pesquisa.setSelecao(
        +oLista.getAtributo('data-tipo'),
        oLista.getValores()
      )
    }

    /**
     * Cria os comportamentos e estilos necessários para a lista de pesquisa
     * @param {ComponenteHTML} oBtn
     * @param {ListaFiltros} oLista
     */
    const handleContext = (oBtn, oLista, iTipo) => {
      this.context.addClass('active')
      oLista.onRemove(() => {
        this.context.removeClass('active')
      })
      const oDimensions = oBtn.getObj().getBoundingClientRect()
      const iTop = oDimensions.bottom
      const iLeft = oDimensions.left
      this.context.setStyleProp('--context-left', iLeft + 'px')
      this.context.setStyleProp('--context-top', iTop + 'px')
      oLista.appendTo(this.context.getObj())
      const aVal =
        iTipo === DataCell.TIPO_PESQUISA.LANGUAGE
          ? this.pesquisa.getSelecaoLang()
          : this.pesquisa.getSelecaoType()
      if (aVal.length) {
        oLista.setValores(aVal)
      }
    }

    // comportamentos para os botões de filtro tipo e linguagem
    this.areaFiltros.type.on('click', () => {
      const oListaType = new ListaFiltros(
        DataCell.TIPO_PESQUISA.TYPE,
        DataCell.FILTRO_TIPOS,
        fnOnClickItemLista
      )
      handleContext(
        this.areaFiltros.type,
        oListaType,
        DataCell.TIPO_PESQUISA.TYPE
      )
    })
    this.areaFiltros.language.on('click', () => {
      const aLanguages = oData
        .getLanguages(
          this.areaFiltros.repo.hasClass('active')
            ? DataCell.TIPO_REPOSITORIO.REPOSITORIO
            : DataCell.TIPO_REPOSITORIO.FAVORITO
        )
        .map(sLanguage => {
          return {
            title: sLanguage,
            value: sLanguage.toLowerCase()
          }
        })
      const oListaPesquisa = new ListaFiltros(
        DataCell.TIPO_PESQUISA.LANGUAGE,
        aLanguages,
        fnOnClickItemLista
      )
      handleContext(
        this.areaFiltros.language,
        oListaPesquisa,
        DataCell.TIPO_PESQUISA.LANGUAGE
      )
    })
  }

  /**
   * Lida com os comportamentos para aplicar a pesquisa
   */
  this.handleSearch = function () {
    /**
     * Aplica a pesquisa e crie um novo grid de cards
     * @param {Array<DataCell>} aCards
     */
    const oFnSearch = (aCards, bLoading = true) => {
      let oLoading
      if (aCards instanceof Promise) {
        oLoading = new Loading('Pesquisando repositórios')
        aCards.then(aRes => {
          oFnSearch(aRes, false)
          oLoading.removeLoading()
        })
        return
      }
      if (bLoading) {
        oLoading = new Loading('Buscando os repositórios')
      }
      this.areaDados.grid.destroy()
      this.areaDados = new DataGrid(this.pesquisa.getTipoRepositorio(), aCards)
      this.areaDados.grid.obj.appendTo(oMain.getObj())
      oLoading && oLoading.removeLoading()
    }

    const oBtnSearch = this.areaFiltros.search
    const oInput = this.areaFiltros.inputSearch
    const onEvent = oEv => {
      setTimeout(() => {
        this.pesquisa.setTextoPesquisa(oEv.target.value)
      }, 100)
    }
    oInput
      .on('change', onEvent)
      .on('keyup', onEvent)
      .on('paste', onEvent)
      .on('keypress', oEv => {
        if (oEv.key === 'Enter') {
          oFnSearch(this.pesquisa.aplicaFiltros())
        }
      })
    oBtnSearch.on('click', () => {
      oFnSearch(this.pesquisa.aplicaFiltros())
    })
  }

  this.init(oData, oMain, oGrid)

  return this
}
