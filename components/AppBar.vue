<template>
  <v-app-bar
    class="app-bar"
    outlined
    elevation="0"
    app
    clipped-left
    clipped-right
    tile
  >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon @click="rightDrawer = !rightDrawer">
      <v-icon v-if="!rightDrawer">mdi-chevron-left</v-icon>
      <v-icon v-else>mdi-chevron-right</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.ui.drawer
      },
      set(value) {
        this.$store.commit('ui/SET_DRAWER', value)
      }
    },
    rightDrawer: {
      get() {
        return this.$store.state.ui.rightDrawer
      },
      set(value) {
        this.$store.commit('ui/SET_RIGHT_DRAWER', value)
      }
    },
    isMobile() {
      return this.$store.getters['ui/isMobile']
    }
  }
}
</script>

<style>
@media only screen and (min-width: 600px) {
  .app-bar.v-app-bar {
    border-bottom: solid 1px #757575 !important;
  }
}
</style>
