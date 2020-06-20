import { firestoreAction } from 'vuexfire'

export const state = () => ({
  categories: []
})

export const getters = {
  getCategories: (state) => state.categories
}

export const mutations = {}

export const actions = {
  bindCategories: firestoreAction(async (context, organizationId) => {
    const { organizationsRef } = await import('~/firestore')
    context.bindFirestoreRef(
      'categories',
      organizationsRef.doc(organizationId).collection('categories')
    )
  })
}
