<template>
  <v-app dark>
    <app-bar></app-bar>
    <right-drawer></right-drawer>
    <navigation-drawer></navigation-drawer>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import localStorage from 'store2'
import AppBar from '~/components/AppBar.vue'
import NavigationDrawer from '~/components/NavigationDrawer.vue'
import RightDrawer from '~/components/RightDrawer.vue'
export default {
  components: {
    AppBar,
    NavigationDrawer,
    RightDrawer
  },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    localStorageData() {
      return {
        organization: localStorage('organization'),
        user: localStorage('user')
      }
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    organization() {
      return this.$store.getters['organization/getOrganization']
    }
  },
  watch: {
    localStorageData: {
      immediate: true,
      handler(localStorageData) {
        if (localStorageData?.organization) {
          this.$store.dispatch('organization/bindOrganizationFromLocalStorage')
        }
        if (localStorageData?.user) {
          this.$store.dispatch('auth/bindUserFromLocalStorage')
        }
      }
    },
    organization: {
      immediate: true,
      handler(organization) {
        // persist organization data on localStorage
        this.$store.dispatch('organization/setLocalStorage', organization)
      }
    },
    user: {
      immediate: true,
      handler(user) {
        // persist user data on localStorage
        this.$store.dispatch('auth/setLocalStorage', user)
      }
    },
    'user.organizationId': {
      immediate: true,
      deep: true,
      handler(organizationId) {
        if (organizationId) {
          this.$store.dispatch('organization/bindOrganization', organizationId)
        }
      }
    }
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch('auth/verifyFirebaseAuth')
    }, 3000)
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.$store.commit('ui/SET_WINDOW_SIZE', {
        x: window.innerWidth,
        y: window.innerHeight
      })
    }
  },
  middleware: 'auth'
}
</script>
