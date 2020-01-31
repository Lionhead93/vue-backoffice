<template>
  <v-navigation-drawer v-model="inputValue" app>
    <v-list-item class="py-5">
      <v-list-item-avatar color="white">
        <v-img :src="logo" height="34" contain />
      </v-list-item-avatar>
      <v-list-item-title class="title">HANPASS</v-list-item-title>
    </v-list-item>
    <v-list shaped>
      <v-list-item-group v-model="select" color="primary">
        <v-list-item v-for="(item, i) in menus" :key="i" :to="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: 'favicon.ico'
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.setDrawer(val)
      }
    },
    select: {
      get() {
        return this.$store.state.menuSeleted
      },
      set(val) {
        this.$store.state.menuSeleted = val
      }
    },
    menus: {
      get() {
        return this.$store.state.menuItems
      }
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>
