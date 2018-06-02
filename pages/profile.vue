<template>
<v-layout>
  <v-navigation-drawer
      right
      clipped
      hide-overlay
      v-model="drawer"
      fixed
      app
      class="hidden-md-and-up"
    >
      <v-list>
        <v-list-tile :style="item.active ? 'background:#4e008c; color:white;' : ''" class="drawNavItems items" @click="navigate(item)" ripple v-for="item in profileItems" :key="item.id">
          <v-list-tile-action>
            <v-icon :style="item.active ? 'color:white;' : ''" class="drawNavIcons">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="navItems">{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
	<v-flex class="tabCont hidden-sm-and-down">
		<v-tabs value="tab-1" grow icons-and-text dark color="accent">
    <v-tabs-slider color="warning"></v-tabs-slider>
    <v-tab v-for="item in profileItems" :key="item.href" :href="item.href">
      {{item.name}}
      <v-icon>{{item.icon}}</v-icon>
    </v-tab>
    <v-tab-item
      lazy
      v-for="item in profileItems"
      :key="item.id"
      :id="item.ID"
    >
      <v-card flat>
        <v-card-text><personal-info/></v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
	</v-flex>
  <v-flex class="hidden-md-and-up">
  <keep-alive>
    <component :is="active"></component>
  </keep-alive>
  </v-flex>
  </v-layout>
</template>

<script>
import PersonalInfo from '~/components/profile/PersonalInfo'
export default {
  name: 'profile',
  components: {
    PersonalInfo
  },
  data () {
    return {
      active: 'PersonalInfo',
      profileItems: [
        {
          icon: 'mdi-account-card-details',
          active: true,
          href: '#tab-1',
          ID: 'tab-1',
          name: 'Personal Information',
          component: 'PersonalInfo'
        },
        {
          icon: 'mdi-book-open-variant',
          active: false,
          href: '#tab-2',
          ID: 'tab-2',
          name: 'Portfolio',
          content: 'hello'
        },
        {
          icon: 'mdi-view-dashboard',
          active: false,
          href: '#tab-3',
          ID: 'tab-3',
          name: 'Dashboard',
          content: 'hello'
        },
        {
          icon: 'mdi-account-settings-variant',
          active: false,
          href: '#tab-4',
          ID: 'tab-4',
          name: 'Account Settings',
          content: 'hello'
        }
      ]
    }
  },
  methods: {
    navigate (item) {
      item.active = true
      this.active = item.component
      this.profileItems.forEach(v => {
        if (v !== item) {
          v.active = false
        }
      })
      this.$store.commit('mobileProf', true)
    }
  },
  computed: {
    drawer: {
      get () {
        return this.$store.state.mobileProf
      },
      set () {}
    }
  }
}
</script>

<style scoped>
</style>
