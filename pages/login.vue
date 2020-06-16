<template>
  <v-layout>
    <v-btn color="success" @click="signInWithGoogle">Entrar com Google</v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    signInWithGoogle() {
      this.$store.dispatch('auth/signIn', 'google')
    }
  }
}
</script>

<style></style>
