export const goTo = (router, nameRouter, params = {}) => {
    router.push({name: nameRouter, params});
}

export const goBack = (router) => {
  // Verifica se existe um histórico interno para voltar
  const canGoBack = window.history.state && window.history.state.back !== null

  if (canGoBack) {
    router.back()
  } else {
    // Fallback para a página inicial
    router.push('/')
  }
}

