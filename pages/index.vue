<template>
  <v-layout column justify-center>
    <organization-select></organization-select>
  </v-layout>
</template>

<script>
import OrganizationSelect from '~/components/OrganizationSelect.vue'
export default {
  components: {
    OrganizationSelect
  }
}
</script>
