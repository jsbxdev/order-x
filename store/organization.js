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
  bindOrganization: firestoreAction(
    async ({ bindFirestoreRef }, organizationId) => {
      if (organizationId) {
        const { organizationsRef } = await import('~/firestore')
        bindFirestoreRef('organization', organizationsRef.doc(organizationId))
      }
    }
  ),
  unbindOrganization: firestoreAction(({ dispatch, unbindFirestoreRef }) => {
    unbindFirestoreRef('organization')
    dispatch('setLocalStorage')
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
  },
  inviteUser: async ({ getters }, userId) => {
    if (userId) {
      const organizationId = getters.getOrganizationId
      const { organizationsRef, FieldValue } = await import('~/firestore')
      organizationsRef.doc(organizationId).update({
        invitedUserIds: FieldValue.arrayUnion(userId)
      })
    }
  }
}
