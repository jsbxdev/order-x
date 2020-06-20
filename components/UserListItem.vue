<template>
  <v-list-item v-if="user" link @click="onClick">
    <v-list-item-avatar>
      <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="user.displayName"></v-list-item-title>
      <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    userId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      user: false
    }
  },
  watch: {
    userId: {
      immediate: true,
      async handler(userId) {
        if (userId) {
          const { usersRef } = await import('~/firestore')
          this.$bind('user', usersRef.doc(userId))
        }
      }
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style></style>
