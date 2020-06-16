export const state = () => ({
  firstPage: false
})

export const getters = {
  getFirstPage: (state) => state.firstPage
}

export const mutations = {
  SET_FIRST_PAGE: (state, value) => (state.firstPage = value)
}
