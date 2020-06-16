import { firestoreAction } from 'vuexfire'

export const state = () => ({
  organization: false
})

export const getters = {
  getOrganization: (state) => state.organization,
  getOrganizationId: (state) => state.organization?.id
}

export const mutations = {}

export const actions = {
  bindOrganization: firestoreAction(async (context, organizationId) => {
    if (organizationId) {
      const { organizationsRef } = await import('~/firestore')
      context.bindFirestoreRef('user', organizationsRef.doc(organizationId))
    }
  }),
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
  }
}
