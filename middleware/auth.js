import localStorage from 'store2'

export default async function({ redirect, route, store }) {
  // debug route
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.warn('Middlware says: ', route)
  }

  // set first page
  if (!store.getters['util/getFirstPage']) {
    store.commit('util/SET_FIRST_PAGE', route.name)
  }

  // verify auth
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
