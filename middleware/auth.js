import localStorage from 'store2'

export default async function({ redirect, route, store }) {
  // eslint-disable-next-line
  console.warn('Middlware says: ', route)
  if (!store.getters['util/getFirstPage']) {
    store.commit('util/SET_FIRST_PAGE', route.name)
  }

  if (!localStorage('user')) {
    const { auth } = await import('~/auth')
    auth.onAuthStateChanged(function(authUser) {
      if (authUser) {
        store.dispatch('auth/bindUser', authUser.uid)
      } else if (route.name !== 'login') {
        return redirect('/login')
      }
    })
  }
}
