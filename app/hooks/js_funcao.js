import { iniciaSistema } from './js_inicia_sistema.js'

/**
 * Funções auxiliares
 */
export const Funcao = {
  /**
   * Salva o nome do usuário no local storage
   * @param {String} sName
   */
  salvaUsername(sName) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('nameUser', sName)
    }
  },
  /**
   * Confere se esta salvo o nome do usuário no local storage
   * @returns {Boolean}
   */
  getSavedUserName() {
    if (typeof Storage !== 'undefined' && localStorage.getItem('nameUser')) {
      return localStorage.getItem('nameUser')
    }
    return false
  },

  async verificarUsuario(sUser) {
    try {
      const response = await fetch(`https://api.github.com/users/${sUser}`)
      if (response.ok) {
        iniciaSistema(sUser)
        return true
      } else {
        alert('usuário com username ' + sUser + ' não encontrado.')
        return false
      }
    } catch (error) {
      return false
    }
  }
}
