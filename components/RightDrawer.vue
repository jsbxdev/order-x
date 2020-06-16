<template>
  <v-navigation-drawer
    v-model="rightDrawer"
    color="red"
    app
    clipped
    right
    floating
  >
    <v-text-field name="name" label="label" id="id"></v-text-field>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    rightDrawer: {
      get() {
        return this.$store.state.ui.rightDrawer
      },
      set(value) {
        this.$store.commit('ui/SET_RIGHT_DRAWER', value)
      }
    }
  }
}
</script>

<style></style>
