import { ComponenteHTML } from './js_componente_html.js'
import { oRoot } from './js_root.js'
import { Icone } from './js_icone.js'

/**
 * Cria a área de filtros e definições de tipos de repositórios do usuário
 * @param {DataCell} oData
 * @returns {Object}
 */
export function criaAreaFiltros(oData) {
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
    .text(oData.getAmountRepositories())
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
    .text(oData.getAmountStarreds())
    .appendTo(oContentBtnStarred.getObj())

  // search area
  const oDivSearch = new ComponenteHTML('div')
  oDivSearch
    .addClass('estrutura-data-container-type-lang')
    .appendTo(oFilter.getObj())
  // filter type
  const oBtnFilterType = new ComponenteHTML('button')
  oBtnFilterType
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
    .appendTo(oBtnFilterType.getObj())
  const oTitleType = new ComponenteHTML('span')
  oTitleType
    .addClass('estrutura-data-button-filter-type')
    .text('Type')
    .appendTo(oBtnFilterType.getObj())
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
      placeholder: 'Enter the repository name'
    })
    .appendTo(oDivSearch.getObj())

  return {
    obj: oFilter,
    repo: oBtnRepo,
    starred: oBtnStarred,
    type: oBtnFilterType,
    language: oBtnFilterLang,
    search: oBtnSearch,
    inputSearch: oInputSearch
  }
}
