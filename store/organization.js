import localStorage from 'store2'
import { firestoreAction } from 'vuexfire'

export const state = () => ({
  organization: false
})

export const getters = {
  getOrganization: (state) => state.organization,
  getOrganizationId: (state) => state.organization?.id
}

export const mutations = {
  SET_ORGANIZATION: (state, user = false) => (state.user = user)
}

export const actions = {
  bindOrganization: firestoreAction(async (context, organizationId) => {
    if (organizationId) {
      const { organizationsRef } = await import('~/firestore')
      context.bindFirestoreRef(
        'organization',
        organizationsRef.doc(organizationId)
      )
    }
  }),
  bindOrganizationFromLocalStorage: ({ commit }) => {
    commit('SET_ORGANIZATION', localStorage('organization') || false)
  },
  create: async (context, organization) => {
    const userId = context.rootGetters['auth/getUserId']
    if (userId) {
      const { organizationsRef, usersRef } = await import('~/firestore')
      organizationsRef
        .add({ ...organization, ownerId: userId })
        .then((organizationDoc) => {
          usersRef.doc(userId).set(
            {
              organizationId: organizationDoc.id
            },
            { merge: true }
          )
        })
    }
  },
  setLocalStorage: (getters, organization = false) => {
    localStorage(
      'organization',
      organization?.id ? { ...organization, id: organization.id } : false
    )
  }
}
