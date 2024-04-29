import { Loading } from './../components/js_loading.js'
import { DataCell } from './js_data_cell.js'
import { buscarDadosUsuarioGitHub } from './js_get_user.js'
import { criaHeader } from './../components/js_header.js'
import { criaMain } from './../components/js_componente_main.js'
import { criaUserProfile } from './../components/js_user_profile.js'
import { DataGrid } from './../components/js_componente_data_grid.js'
import { ComponenteFiltros } from './../components/js_componente_filtros.js'

/**
 * Inicia o sistema
 */
export async function iniciaSistema(sUser = 'diego3g') {
  const oLoading = new Loading('Carregando os dados')
  const oData = new DataCell()
  await buscarDadosUsuarioGitHub(sUser)
    .then(oUserData => {
      if (oUserData) {
        // falta um ícone/botão de voltar ao inicio
        // pq senão ira ficar preso no mesmo user até limpar storage
        // salvaUsername(sUser)
        oUserData.user && oData.setUser(oUserData.user)
        oUserData.repos && oData.setRepositories(oUserData.repos)
        oUserData.starred && oData.setStarreds(oUserData.starred)
      } else {
        alert('Não foi possível obter os dados do usuário.')
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

  // área dos cards inicial
  let oGrid = new DataGrid(DataCell.TIPO_REPOSITORIO.REPOSITORIO, oData)
  // área de filtros
  new ComponenteFiltros(oData, oMain, oGrid, oLoading)
  oGrid.grid.obj.appendTo(oMain.getObj())
}
