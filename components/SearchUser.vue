<template>
  <v-container class="py-0 px-0">
    <v-subheader>Adicionar Usuários</v-subheader>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="email"
          color="white"
          outlined
          type="email"
          label="Digite o e-mail do usuário"
          append-icon="mdi-magnify"
          hide-details
          :loading="isLoading"
          @click:append="search"
          @keydown.enter="search"
        ></v-text-field>
      </v-col>
      <v-col v-show="users.length" cols="12">
        <v-list two-line>
          <v-subheader>Escolha um usuário para convidar</v-subheader>
          <v-list-item
            v-for="user in users"
            :key="user.uid"
            link
            @click="invite(user.uid)"
          >
            <v-list-item-avatar>
              <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="user.displayName"></v-list-item-title>
              <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: 'joseeduardobarros@gmail.com',
      users: [],
      isLoading: false
    }
  },
  watch: {
    users: {
      immediate: true,
      handler(users) {
        if (users.length) {
          this.isLoading = false
        }
      }
    }
  },
  methods: {
    async search() {
      this.isLoading = true
      this.users = []
      const { usersRef } = await import('~/firestore')
      usersRef
        .where('email', '==', this.email)
        .get()
        .then((querySnapshot) => {
          this.disableLoading()
          querySnapshot.forEach((doc) => {
            this.users.push({
              ...doc.data()
            })
          })
        })
      // this.$bind('users', usersRef.where()).then(
      //   this.disableLoading
      // )
    },
    disableLoading() {
      this.isLoading = false
    },
    invite(userId) {
      this.$store.dispatch('organization/inviteUser', userId)
    }
  }
}
</script>

<style></style>
