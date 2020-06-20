import localStorage from 'store2'
import { firestoreAction } from 'vuexfire'

export const state = () => ({
  user: false,
  authVerified: false
})

export const getters = {
  isAuthVerified: (state) => !!state.authVerified,
  isUserAdmin: (state) => (state.user ? !!state.user.isAdmin : false),
  isUserSigned: (state) => state.authVerified,
  getUser: (state) => state.user,
  getUserId: (state) => (state.user ? state.user.uid : false),
  getUserPhotoURL: (state) => (state.user ? state.user.photoURL : false),
  getUserOrganizationId: (state) => state.user?.organizationId
}

export const mutations = {
  SET_AUTH_VERIFIED: (state, value) => (state.authVerified = !!value),
  SET_USER: (state, user = false) => (state.user = user)
}

export const actions = {
  bindUser: firestoreAction(async (context, userId = false) => {
    const localStorageUser = !localStorage('user')
    userId = userId || localStorageUser.uid
    if (userId) {
      const { usersRef } = await import('~/firestore')
      context.bindFirestoreRef('user', usersRef.doc(userId))
    }
  }),
  bindUserFromLocalStorage: ({ commit, dispatch }) => {
    commit('SET_USER', localStorage('user') || false)
  },
  verifyFirebaseAuth: async ({ dispatch, commit }) => {
    const { auth } = await import('~/auth')
    const { usersRef } = await import('~/firestore')
    auth.onAuthStateChanged(function(authUser) {
      commit('SET_AUTH_VERIFIED', true)
      if (authUser) {
        const user = {
          ...authUser.providerData[0],
          uid: authUser.uid
        }
        usersRef
          .doc(user.uid)
          .set(user, { merge: true })
          .then(() => {
            dispatch('bindUser', user.uid)
          })
      } else {
        commit('SET_USER', false)
        dispatch('setLocalStorage', false)
      }
    })
  },
  setLocalStorage: (context, user = false) => {
    if (user?.uid) {
      localStorage('user', user)
    } else {
      localStorage('user', false)
    }
  },
  signIn: async (context, providerId) => {
    const { auth } = await import('~/auth')
    try {
      if (providerId === 'google') {
        const { googleAuthProvider } = await import('~/auth')
        auth.signInWithRedirect(googleAuthProvider)
      } else if (providerId === 'facebook') {
        const { facebookAuthProvider } = await import('~/auth')
        auth.signInWithRedirect(facebookAuthProvider)
      }
    } catch {}
  },
  signOut: async (context) => {},
  acceptInvite: async ({ getters }, organizationId) => {
    const { usersRef, organizationsRef, FieldValue } = await import(
      '~/firestore'
    )
    const userId = getters.getUserId
    usersRef.doc(userId).set({ organizationId }, { merge: true })
    await organizationsRef.doc(organizationId).update({
      invitedUserIds: FieldValue.arrayRemove(userId),
      [`users.${userId}.hasAccepted`]: true
    })
    return true
  }
}
