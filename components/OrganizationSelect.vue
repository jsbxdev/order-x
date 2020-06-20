<template>
  <v-card v-if="!hasOrganization" outlined>
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center">
            Você não está conectado com nenhuma organização, peça para te
            adicionarem pelo e-mail:
          </p>
          <p class="text-center">{{ userEmail }}</p>
        </v-col>
        <v-col cols="12">
          <v-list class="d-flex flex-column align-center">
            <v-subheader>Selecione a organização:</v-subheader>
            <v-progress-circular
              v-if="!invites.length"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <v-list-item
              v-for="organization in invites"
              :key="organization.id"
              link
              @click="acceptInvite(organization.id)"
            >
              <v-list-item-title>{{ organization.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" class="d-flex flex-column align-center">
          <v-subheader>Ou crie uma nova organização:</v-subheader>
          <v-btn color="success" block @click="createOrganization">
            Criar Organização
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      invites: []
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    userEmail() {
      return this.user?.email
    },
    hasOrganization() {
      return this.user?.organizationId
    }
  },
  watch: {
    user: {
      immediate: true,
      async handler(user) {
        if (user) {
          const { organizationsRef } = await import('~/firestore')
          this.$bind(
            'invites',
            organizationsRef.where('invitedUserIds', 'array-contains', user.uid)
          )
        }
      }
    }
  },
  methods: {
    acceptInvite(organizationId) {
      this.$store.dispatch('auth/acceptInvite', organizationId)
    },
    createOrganization() {
      this.$router.push({ name: 'organization-create' })
    }
  }
}
</script>

<style></style>
