import { Funcao } from './hooks/js_funcao.js'
import { iniciaSistema } from './hooks/js_inicia_sistema.js'
import { criaModal } from './components/js_componente_modal.js'

/**
 * Inicializa o sistema
 */
function init() {
  const xSaved = Funcao.getSavedUserName()
  if (xSaved) {
    iniciaSistema(xSaved)
    return
  }
  criaModal()
}
init()
