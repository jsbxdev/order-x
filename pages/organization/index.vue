<template>
  <v-row dense>
    <v-col>
      <h1>Organização</h1>
    </v-col>
    <v-col cols="12">
      <v-subheader>Informações</v-subheader>
      <v-card outlined>
        <organization-form :organization="organization"></organization-form>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-subheader>Usuários</v-subheader>
      <v-card outlined>
        <v-container>
          <search-user></search-user>
          <v-subheader>Usuários Ativos</v-subheader>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import OrganizationForm from '~/components/OrganizationForm.vue'
import SearchUser from '~/components/SearchUser.vue'
export default {
  components: {
    OrganizationForm,
    SearchUser
  },
  data() {
    return {
      valid: false,
      data: {}
    }
  },
  computed: {
    organization() {
      return this.$store.getters['organization/getOrganization']
    }
  },
  watch: {
    organization: {
      immediate: true,
      handler(organization) {
        if (organization) {
          this.data = { ...organization }
        }
      }
    }
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
      }
    }
  }
}
</script>

<style></style>
