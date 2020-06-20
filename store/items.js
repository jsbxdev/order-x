import { firestoreAction } from 'vuexfire'

export const state = () => ({
  items: []
})

export const getters = {}

export const mutations = {}

export const actions = {
  bindItems: firestoreAction(async (context, organizationId) => {
    const { organizationsRef } = await import('~/firestore')
    context.bindFirestoreRef(
      'items',
      organizationsRef.doc(organizationId).collection('items')
    )
  })
}
