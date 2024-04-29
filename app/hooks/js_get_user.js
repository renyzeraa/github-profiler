/**
 * Realiza a busca dos dados do usuário seleciona na API do github
 * @param {String} sName - nome do usuário
 * @returns {Object}
 */
export async function buscarDadosUsuarioGitHub(sName) {
  /**
   * quando não autenticado a requisição, o github limita a 30 repositórios e também não traz todo o conteúdo
   */
  try {
    // repositories
    const responseRepos = await fetch(
      `https://api.github.com/users/${sName}/repos`
    )
    if (!responseRepos.ok) {
      throw new Error('Não foi possível obter os dados do usuário')
    }
    const aJsonRepos = await responseRepos.json()
    // starreds
    const responseStarreds = await fetch(
      `https://api.github.com/users/${sName}/starred`
    )
    if (!responseStarreds.ok) {
      throw new Error(
        'Não foi possível obter os repositórios favoritados do usuário'
      )
    }
    const aJsonStarreds = await responseStarreds.json()
    // user
    const responseUser = await fetch(`https://api.github.com/users/${sName}`)
    if (!responseStarreds.ok) {
      throw new Error(
        'Não foi possível obter os repositórios favoritados do usuário'
      )
    }
    const oUser = await responseUser.json()
    /**
     * Formata os dados recebidos no json para somente dados necessários
     * @param {Object} oData
     * @returns {Object}
     */
    function formatarDados(oData) {
      /**
       * Formata string remover hifens e capitaliza a primeira letra de cada palavra
       * @param {String} str
       * @returns
       */
      function formatarString(str) {
        return str.replace(/-/g, ' ').replace(/\b\w/g, function (match) {
          return match.toUpperCase()
        })
      }

      return {
        id: oData.id,
        title: formatarString(oData.name),
        description: oData.description,
        url: oData.html_url,
        stars: oData.stargazers_count,
        forks: oData.forks_count,
        watchers: oData.watchers_count,
        language: oData.language,
        open_issues: oData.open_issues_count,
        archived: oData.archived,
        starred: oUser.login !== oData.owner.login
      }
    }
    return {
      user: {
        avatar: oUser.avatar_url,
        nome: oUser.name,
        bio: oUser.bio,
        company: oUser.company,
        location: oUser.location,
        blog: oUser.blog,
        url: oUser.html_url,
        username: oUser.login
      },
      repos: aJsonRepos.map(formatarDados),
      starred: aJsonStarreds.map(formatarDados)
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do usuário:', error)
    return null
  }
}
