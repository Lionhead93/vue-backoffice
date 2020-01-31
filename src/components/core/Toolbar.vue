<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon @click.stop="onClickBtn" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    title: null,
    responsive: false
  }),
  watch: {
    $route(val) {
      this.title = val.name
    }
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>
