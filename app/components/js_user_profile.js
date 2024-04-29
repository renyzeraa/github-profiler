import { ComponenteHTML } from './js_componente_html.js'
import { Icone } from './js_icone.js'
import { criaUserExtraInfos } from './js_user_extra_infos.js'

/**
 * Cria a área de informações do usuário
 * @param {Object} oUser
 * @returns {ComponenteHTML}
 */
export function criaUserProfile(oUser) {
  const oAside = new ComponenteHTML('aside')
  oAside.addClass('estrutura-container-user-profile')

  const oAvatar = new ComponenteHTML('div')
  oAvatar.addClass('estrutura-container-user-avatar').appendTo(oAside.getObj())

  const oImage = new ComponenteHTML('img')
  oImage
    .addClass('estrutura-container-user-avatar-image')
    .appendTo(oAvatar.getObj())
    .setAtributos({
      src: oUser.avatar,
      alt: 'Avatar do usuário'
    })

  const oName = new ComponenteHTML('h2')
  oName
    .addClass('estrutura-container-user-name')
    .text(oUser.nome)
    .appendTo(oAside.getObj())

  const oBio = new ComponenteHTML('span')
  oBio
    .addClass('estrutura-container-user-bio')
    .text(oUser.bio)
    .appendTo(oAside.getObj())

  const oBtnInfos = new ComponenteHTML('button')
  oBtnInfos
    .addClass('estrutura-container-user-button')
    .setAtributo('data-info-ativo', false)
    .appendTo(oAside.getObj())

  const oTextButton = new ComponenteHTML('span')
  oTextButton
    .addClass('estrutura-container-user-button-text')
    .text('Informações Adicionais')
    .appendTo(oBtnInfos.getObj())
  const oIconChevron = new ComponenteHTML('img')
  oIconChevron
    .addClass('estrutura-container-user-button-icon')
    .setAtributos({
      src: Icone.chevron,
      alt: 'ícone de abrir informações adicionais'
    })
    .appendTo(oBtnInfos.getObj())

  const oInfosExtras = criaUserExtraInfos(oAside, oUser)

  oBtnInfos.on('click', () => {
    const bAtivo = oBtnInfos.getAtributo('data-info-ativo') === 'true'
    if (bAtivo) {
      oInfosExtras.removeClass('active')
      oIconChevron.removeClass('active')
    } else {
      oInfosExtras.addClass('active')
      oIconChevron.addClass('active')
    }
    oBtnInfos.setAtributo('data-info-ativo', !bAtivo)
  })

  return oAside
}
