export const state = () => ({
  drawer: false,
  drawerMiniVariant: false,
  rightDrawer: false,
  windowSize: {
    x: 0,
    y: 0
  }
})

export const mutations = {
  SET_DRAWER: (state, value) => {
    if (state.windowSize.x < 600) {
      state.drawer = !!value
    } else {
      state.drawer = true
      state.drawerMiniVariant = !state.drawerMiniVariant
    }
  },
  SET_RIGHT_DRAWER: (state, value) => (state.rightDrawer = !!value),
  SET_WINDOW_SIZE: (state, value) => (state.windowSize = value)
}

export const getters = {
  isMobile: (state) => state.windowSize.x < 600,
  drawerMiniVariant: (state) => state.drawerMiniVariant
}
