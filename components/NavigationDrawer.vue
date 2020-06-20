<template>
  <v-navigation-drawer
    v-model="drawer"
    color="#121212"
    app
    clipped
    :expand-on-hover="!isMobile && miniVariant"
    :mini-variant="!isMobile && miniVariant"
    floating
  >
    <v-list shaped>
      <!-- Orders -->
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-view-comfy</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pedidos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- Menu -->
      <v-list-item link to="/menu">
        <v-list-item-icon>
          <v-icon>mdi-food</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Cardápio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- Organization View -->
      <v-list-item link to="/organization">
        <v-list-item-icon>
          <v-icon>mdi-store-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Organização</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.ui.drawer
      },
      set(value) {
        this.$store.commit('ui/SET_DRAWER', this.isMobile ? value : true)
      }
    },
    miniVariant() {
      return this.$store.getters['ui/drawerMiniVariant']
    },
    isMobile() {
      return this.$store.getters['ui/isMobile']
    }
  }
}
</script>

<style></style>
