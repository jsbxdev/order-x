<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="organization.name"
            label="Nome do Negócio"
            :rules="nameRules"
            autocomplete="organizationName"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="success" @click="create">Criar Organização</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      organization: {},
      valid: false,
      nameRules: [(v) => !!v || 'Name is required']
    }
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
          console.log('redirecting...')
        }
      }
    }
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('organization/create', this.organization)
      }
    }
  }
}
</script>

<style></style>
