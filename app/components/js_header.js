import { ComponenteHTML } from './js_componente_html.js'
import { Icone } from './js_icone.js'
import { oRoot } from './js_root.js'

/**
 * Cria o header principal do site
 */
export function criaHeader() {
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
