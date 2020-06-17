<template>
  <v-card outlined>
    <organization-form is-empty></organization-form>
  </v-card>
</template>

<script>
import OrganizationForm from '~/components/OrganizationForm.vue'
export default {
  components: {
    OrganizationForm
  },
  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  },
  watch: {
    'user.organizationId': {
      immediate: true,
      deep: true,
      handler(organizationId) {
        if (organizationId) {
          this.$router.push({ name: 'index' })
        }
      }
    }
  }
}
</script>

<style></style>
