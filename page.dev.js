"use strict";

{
  /* <Container>
  <nav className="nav-github">
    <div className="nav-content">
        <span className="logo-svg">
            <BsGithub />
        </span>
        <img src={LogoGithub} className="logo-title" />
          <span className="logo-detail">/</span>
        <span className="name-page">Profile</span>
    </div>
  </nav>
  <section className="grid-content">
    <header className="header-perfil">
        <div className="photo-content">
            <img
                className="user-perfil"
                src="https://avatars.githubusercontent.com/renyzeraa "
                alt="Foto Perfil do Usuário"
            />
            <span className="status-perfil">👾</span>
        </div>
        <h1 className="name-perfil">{user.name}</h1>
        <p className="text-perfil">{user.bio}</p>
        <button
            className="infos-add-perfil"
            onClick={() =>
                bInfoAtivado
                    ? setInfoAtivado(false)
                    : setInfoAtivado(true)
            }
        >
            Informações Adicionais
            <span
                className={
                    bInfoAtivado
                        ? 'button-info active'
                        : 'button-info'
                }
            >
                <BiChevronDown />
            </span>
        </button>
        <div
            className={
                bInfoAtivado
                    ? 'details-perfil active'
                    : 'details-perfil'
            }
        >
            <ul className="list-details">
                <li>
                    <BsFillBuildingFill />
                    <span>{user.company}</span>
                </li>
                <li>
                    <FiMapPin />
                    <span>{user.location}</span>
                </li>
                {user.blog ? (
                    <li>
                        <IoIosLink />
                        <span>{user.blog}</span>
                    </li>
                ) : (
                    ''
                )}
                  <li>
                    <BsInstagram />
                    <span>{user.login}</span>
                </li>
            </ul>
        </div>
    </header>
    <article className="content-repo">
        <div className="toggle-option">
            <button
                className="button-option"
                onClick={() => triggerAbaAtivo(true, true)}
            >
                <BiBookBookmark /> Repositories
                <span className="count">{repos.length}</span>
            </button>
            <button
                className="button-option"
                onClick={() => triggerAbaAtivo(true, false)}
            >
                <BiStar /> Starred
                <span className="count">{starreds.length}</span>
            </button>
        </div>
        <div className="search-content">
            <div className="button-content">
                <button
                    className="button-prefs"
                    onClick={() => {
                        bListTypeActive
                            ? setListTypeActive(false)
                            : bListLangActive
                            ? toggleListTypeActive()
                            : setListTypeActive(true)
                    }}
                >
                    <BiChevronDown /> Type
                    <div
                        className={
                            bListTypeActive
                                ? 'prefs-list active'
                                : 'prefs-list'
                        }
                    >
                        <header className="list-header">
                            <h1 className="list-title">Type</h1>
                            <button>
                                <GrFormClose />
                            </button>
                        </header>
                          <ul className="list-options">
                            {listType &&
                                listType.map(type => (
                                    <li>
                                        <input
                                            type="checkbox"
                                            id={type}
                                        />
                                        <span>{type}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </button>
                <button
                    className="button-prefs"
                    onClick={() => {
                        bListLangActive
                            ? setListLangActive(false)
                            : bListTypeActive
                            ? toggleListLangActive()
                            : setListLangActive(true)
                    }}
                >
                    <BiChevronDown /> Language
                    <div
                        className={
                            bListLangActive
                                ? 'prefs-list active'
                                : 'prefs-list'
                        }
                    >
                        <header className="list-header">
                            <h1 className="list-title">Language</h1>
                            <button>
                                <GrFormClose />
                            </button>
                        </header>
                          <ul className="list-options">
                            {listLang &&
                                listLang.map(lang => (
                                    <li>
                                        <input
                                            type="checkbox"
                                            id={lang}
                                        />
                                        <span>{lang}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </button>
            </div>
            <span>
                <BiSearch />
                <input
                    type="text"
                    placeholder="Search Here"
                    className="ipt-search-repo"
                    onKeyPress={handleKeyPress}
                />
            </span>
        </div>
        <ul
            className={
                repoAtivado
                    ? 'content-projects repositories active'
                    : 'content-projects repositories'
            }
        >
            {repos.map(repo => (
                <li className="card-project" key={repo.id}>
                    <h2>{repo.name}</h2>
                    <p>{repo.description}</p>
                    <div className="stats">
                        <span>
                            <FaStar />
                            {repo.stargazers_count}
                        </span>
                          <span>
                            <BiGitBranch />
                            {repo.forks}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
        <ul
            className={
                starredAtivado
                    ? 'content-projects starred active'
                    : 'content-projects starred'
            }
        >
            {starreds.map(star => (
                <li className="card-project" key={star.id}>
                    <h2>{star.name}</h2>
                    <p>{star.description}</p>
                    <div className="stats">
                        {star.language ? (
                            <span>{star.language}</span>
                        ) : (
                            ''
                        )}
                        <span>
                            <BiGitBranch />
                            {star.forks}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    </article>
  </section>
  </Container>       <Container>
            <nav className="nav-github">
                <div className="nav-content">
                    <span className="logo-svg">
                        <BsGithub />
                    </span>
                    <img src={LogoGithub} className="logo-title" />
                      <span className="logo-detail">/</span>
                    <span className="name-page">Profile</span>
                </div>
            </nav>
            <section className="grid-content">
                <header className="header-perfil">
                    <div className="photo-content">
                        <img
                            className="user-perfil"
                            src="https://avatars.githubusercontent.com/renyzeraa "
                            alt="Foto Perfil do Usuário"
                        />
                        <span className="status-perfil">👾</span>
                    </div>
                    <h1 className="name-perfil">{user.name}</h1>
                    <p className="text-perfil">{user.bio}</p>
                    <button
                        className="infos-add-perfil"
                        onClick={() =>
                            bInfoAtivado
                                ? setInfoAtivado(false)
                                : setInfoAtivado(true)
                        }
                    >
                        Informações Adicionais
                        <span
                            className={
                                bInfoAtivado
                                    ? 'button-info active'
                                    : 'button-info'
                            }
                        >
                            <BiChevronDown />
                        </span>
                    </button>
                    <div
                        className={
                            bInfoAtivado
                                ? 'details-perfil active'
                                : 'details-perfil'
                        }
                    >
                        <ul className="list-details">
                            <li>
                                <BsFillBuildingFill />
                                <span>{user.company}</span>
                            </li>
                            <li>
                                <FiMapPin />
                                <span>{user.location}</span>
                            </li>
                            {user.blog ? (
                                <li>
                                    <IoIosLink />
                                    <span>{user.blog}</span>
                                </li>
                            ) : (
                                ''
                            )}
                              <li>
                                <BsInstagram />
                                <span>{user.login}</span>
                            </li>
                        </ul>
                    </div>
                </header>
                <article className="content-repo">
                    <div className="toggle-option">
                        <button
                            className="button-option"
                            onClick={() => triggerAbaAtivo(true, true)}
                        >
                            <BiBookBookmark /> Repositories
                            <span className="count">{repos.length}</span>
                        </button>
                        <button
                            className="button-option"
                            onClick={() => triggerAbaAtivo(true, false)}
                        >
                            <BiStar /> Starred
                            <span className="count">{starreds.length}</span>
                        </button>
                    </div>
                    <div className="search-content">
                        <div className="button-content">
                            <button
                                className="button-prefs"
                                onClick={() => {
                                    bListTypeActive
                                        ? setListTypeActive(false)
                                        : bListLangActive
                                        ? toggleListTypeActive()
                                        : setListTypeActive(true)
                                }}
                            >
                                <BiChevronDown /> Type
                                <div
                                    className={
                                        bListTypeActive
                                            ? 'prefs-list active'
                                            : 'prefs-list'
                                    }
                                >
                                    <header className="list-header">
                                        <h1 className="list-title">Type</h1>
                                        <button>
                                            <GrFormClose />
                                        </button>
                                    </header>
                                      <ul className="list-options">
                                        {listType &&
                                            listType.map(type => (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        id={type}
                                                    />
                                                    <span>{type}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </button>
                            <button
                                className="button-prefs"
                                onClick={() => {
                                    bListLangActive
                                        ? setListLangActive(false)
                                        : bListTypeActive
                                        ? toggleListLangActive()
                                        : setListLangActive(true)
                                }}
                            >
                                <BiChevronDown /> Language
                                <div
                                    className={
                                        bListLangActive
                                            ? 'prefs-list active'
                                            : 'prefs-list'
                                    }
                                >
                                    <header className="list-header">
                                        <h1 className="list-title">Language</h1>
                                        <button>
                                            <GrFormClose />
                                        </button>
                                    </header>
                                      <ul className="list-options">
                                        {listLang &&
                                            listLang.map(lang => (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        id={lang}
                                                    />
                                                    <span>{lang}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </button>
                        </div>
                        <span>
                            <BiSearch />
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="ipt-search-repo"
                                onKeyPress={handleKeyPress}
                            />
                        </span>
                    </div>
                    <ul
                        className={
                            repoAtivado
                                ? 'content-projects repositories active'
                                : 'content-projects repositories'
                        }
                    >
                        {repos.map(repo => (
                            <li className="card-project" key={repo.id}>
                                <h2>{repo.name}</h2>
                                <p>{repo.description}</p>
                                <div className="stats">
                                    <span>
                                        <FaStar />
                                        {repo.stargazers_count}
                                    </span>
                                      <span>
                                        <BiGitBranch />
                                        {repo.forks}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul
                        className={
                            starredAtivado
                                ? 'content-projects starred active'
                                : 'content-projects starred'
                        }
                    >
                        {starreds.map(star => (
                            <li className="card-project" key={star.id}>
                                <h2>{star.name}</h2>
                                <p>{star.description}</p>
                                <div className="stats">
                                    {star.language ? (
                                        <span>{star.language}</span>
                                    ) : (
                                        ''
                                    )}
                                    <span>
                                        <BiGitBranch />
                                        {star.forks}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </Container> */
}