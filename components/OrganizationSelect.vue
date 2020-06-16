<template>
  <v-card v-if="!hasOrganization" outlined>
    <v-container>
      <p class="text-center">
        Você não está conectado com nenhuma organização, peça para te
        adicionarem pelo e-mail:
      </p>
      <p class="text-center">{{ userEmail }}</p>
      <p>
        {{ hasOrganization }}
      </p>
      <v-btn color="success" @click="createOrganization">
        Criar Organização
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
export default {
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
  methods: {
    createOrganization() {
      this.$router.push({ name: 'organization-create' })
    }
  }
}
</script>

<style></style>
