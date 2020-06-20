<template>
  <v-layout column>
    <v-container>
      <h1>Cardápio</h1>
      <category-form is-empty></category-form>
      {{ categories }}
    </v-container>
  </v-layout>
</template>

<script>
import CategoryForm from '~/components/CategoryForm.vue'
export default {
  components: {
    CategoryForm
  },
  computed: {
    categories() {
      return this.$store.getters['categories/getCategories']
    }
  }
}
</script>

<style></style>
