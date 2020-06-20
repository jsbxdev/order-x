<template>
  <v-form ref="categoryForm" lazy-validation>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="data.name"
          label="Nome da Categoria"
          :rules="notEmptyRule"
          counter="30"
          hint="Lanches, pizzas, bebidas etc"
          autocomplete="off"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn v-if="isEmpty" block color="success" @click="create"
          >Criar</v-btn
        >
        <v-btn v-else blockcolor="success" @click="update">Salvar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    isEmpty: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      data: {},
      notEmptyRule: [(v) => !!v || 'A categoria precisa de um nome']
    }
  },
  methods: {
    create() {
      if (this.$refs.categoryForm.validate()) {
        this.$store.dispatch('categories/create', this.data)
      }
    },
    update() {
      if (this.$refs.categoryForm.validate()) {
        this.$store.dispatch('categories/update', this.data)
      }
    }
  }
}
</script>

<style></style>
