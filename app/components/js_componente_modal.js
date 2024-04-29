import { ComponenteHTML } from './js_componente_html.js'
import { oRoot } from './js_root.js'
import { Icone } from './js_icone.js'
import { Funcao } from '../hooks/js_funcao.js'

/**
 * Cria o modal inicial do sistema
 */
export function criaModal() {
  const oSection = new ComponenteHTML('section')
  oSection.addClass('estrutura-modal').appendTo(oRoot)

  const oContent = new ComponenteHTML('div')
  oContent.addClass('estrutura-modal-content').appendTo(oSection.getObj())

  const oTitle = new ComponenteHTML('h2')
  oTitle
    .addClass('estrutura-modal-title')
    .text('Github Profiler')
    .appendTo(oContent.getObj())

  const oText = new ComponenteHTML('p')
  oText
    .addClass('estrutura-modal-text')
    .text(
      'Digite o username do perfil de um usuário do github que deseja abaixo.'
    )
    .appendTo(oContent.getObj())

  const oButton = new ComponenteHTML('button')
  oButton.addClass('estrutura-modal-button').appendTo(oContent.getObj())
  const oIconSearch = new ComponenteHTML('img')
  oIconSearch
    .on('click', () => {
      const sVal = oInput.getValor()
      if (sVal === '') {
        oInput.addClass('campo-invalido')
        return
      }
      sVal.toLowerCase()
      Funcao.verificarUsuario(sVal).then(bOk => {
        if (bOk) {
          oSection.remove()
        } else {
          oInput.addClass('campo-invalido').focus()
        }
      })
    })
    .setAtributos({
      src: Icone.search,
      alt: 'ícone de pesquisar',
      title: 'Clique aqui para pesquisar'
    })
    .appendTo(oButton.getObj())

  const oInput = new ComponenteHTML('input')
  oInput
    .addClass('estrutura-modal-input')
    .setAtributos({
      type: 'text',
      placeholder: 'Digite aqui'
    })
    .on('click', () => {
      oInput.removeClass('campo-invalido')
    })
    .on('keypress', oEv => {
      oEv.key === 'Enter' && oIconSearch.trigger('click')
    })
    .appendTo(oContent.getObj())
}
