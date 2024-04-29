import { DataCell } from './../hooks/js_data_cell.js'
import { ComponenteHTML } from './js_componente_html.js'
import { criaAreaFiltros } from './js_area_filtros.js'
import { criaAreaContext } from './js_componente_context.js'
import { DataGrid } from './js_componente_data_grid.js'
import { ListaFiltros } from './js_componente_lista.js'

/**
 * Cria o componente e os comportamentos de filtros
 * Cria o contexto onde sera inserido a lista de filtros
 * @param {DataCell} oData
 * @param {ComponenteHTML} oMain
 * @param {ComponenteGridCards} oGrid
 * @param {Loading} oLoading
 */
export function ComponenteFiltros(oData, oMain, oGrid, oLoading) {
  this.filtros = []

  const oFilter = criaAreaFiltros(oData)
  oFilter.repo.addClass('active')
  oFilter.repo.on('click', () => {
    if (oFilter.repo.hasClass('active')) {
      return
    }
    oLoading.iniciaLoading('Carregando repositórios')
    oFilter.repo.addClass('active')
    oFilter.starred.removeClass('active')
    oGrid.grid.destroy()
    oGrid = new DataGrid(DataCell.TIPO_REPOSITORIO.REPOSITORIO, oData)
    oGrid.grid.obj.appendTo(oMain.getObj())
    setTimeout(() => {
      oLoading.removeLoading()
    }, 120)
  })
  oFilter.starred.on('click', () => {
    if (oFilter.starred.hasClass('active')) {
      return
    }
    oLoading.iniciaLoading('Carregando repositórios favoritados')
    oFilter.starred.addClass('active')
    oFilter.repo.removeClass('active')
    oGrid.grid.destroy()
    oGrid = new DataGrid(DataCell.TIPO_REPOSITORIO.FAVORITO, oData)
    oGrid.grid.obj.appendTo(oMain.getObj())
    setTimeout(() => {
      oLoading.removeLoading()
    }, 120)
  })
  oFilter.obj.appendTo(oMain.getObj())
  // área de contexto
  const oContext = criaAreaContext()
  oContext.on('click', e => {
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
    oContext.removeFilhos()
    oContext.removeClass('active')
  })

  const fnOnClickItemLista = e => {
    e.target
    /**
     * @TODO Não consegui fazer a tempo a filtragem...
     */
  }

  /**
   * Cria os comportamentos e estilos necessários para a lista de pesquisa
   * @param {ComponenteHTML} oBtn
   * @param {ListaFiltros} oLista
   */
  const handleContext = function (oBtn, oLista) {
    oContext.addClass('active')
    oLista.onRemove(() => {
      oContext.removeClass('active')
    })
    const oDimensions = oBtn.getObj().getBoundingClientRect()
    const iTop = oDimensions.bottom + window.scrollY
    const iLeft = oDimensions.left - window.scrollX
    oContext.setStyleProp('--context-left', iLeft + 'px')
    oContext.setStyleProp('--context-top', iTop + 'px')
    oLista.appendTo(oContext.getObj())
  }

  // comportamentos para os botões de filtro tipo e linguagem
  oFilter.type.on('click', () => {
    const oListaType = new ListaFiltros(
      DataCell.TIPO_PESQUISA.TYPE,
      DataCell.FILTRO_TIPOS,
      fnOnClickItemLista
    )
    handleContext(oFilter.type, oListaType)
  })
  oFilter.language.on('click', () => {
    const aLanguages = oData
      .getLanguages(
        oFilter.repo.hasClass('active')
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
      DataCell.TIPO_PESQUISA.TYPE,
      aLanguages,
      fnOnClickItemLista
    )
    handleContext(oFilter.language, oListaPesquisa)
  })

  return this
}
