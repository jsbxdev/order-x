<template>
  <v-list two-line>
    <div v-if="!users.length" class="d-flex justify-center">
      <v-progress-circular indeterminate> </v-progress-circular>
    </div>
    <user-list-item
      v-for="user in users"
      :key="user.id"
      :user-id="user.id"
      @click="test"
    ></user-list-item>
  </v-list>
</template>

<script>
import UserListItem from '~/components/UserListItem.vue'
export default {
  components: {
    UserListItem
  },
  props: {
    users: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    test() {
      console.log('oioiii')
    }
  }
}
</script>

<style></style>
