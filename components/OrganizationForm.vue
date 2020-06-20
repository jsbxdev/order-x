<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="data.name"
            outlined
            hint="O nome do seu restaurante ou lanchonete"
            label="Nome do Negócio"
            counter="30"
            :rules="nameRules"
            autocomplete="organizationName"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn v-if="isEmpty" color="success" block @click="create">
            Criar Organização
          </v-btn>
          <v-btn v-else color="success" block @click="update">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    isEmpty: {
      default: false,
      type: Boolean
    },
    organization: {
      default: false,
      type: [Object, Boolean]
    }
  },
  data() {
    return {
      data: {},
      valid: false,
      nameRules: [(v) => !!v || 'É necessário um nome']
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  },
  watch: {
    organization: {
      immediate: true,
      handler(organization) {
        if (organization) {
          this.data = {
            ...organization
          }
        }
      }
    }
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('organization/create', this.data)
      }
    },
    update() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('organization/create', this.data)
      }
    }
  }
}
</script>

<style></style>
