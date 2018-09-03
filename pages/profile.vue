<template>
<v-layout>
    <loader v-if="loading"/>
  <v-navigation-drawer
      right
      clipped
      hide-overlay
      v-model="drawer"
      fixed
      class="hidden-md-and-up"
    >
      <v-list>
        <v-list-tile :style="item.active ? 'background:#4e008c; color:white;' : ''" class="drawNavItems items" @click="navigate(item)" ripple v-for="(item, i) in profileItems" :key="i">
          <v-list-tile-action>
            <v-icon :style="item.active ? 'color:white;' : ''" class="drawNavIcons">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="navItems">{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
	<v-dialog persistent v-model="dialog.status" max-width="300">
      <v-card>
        <v-icon class="pa-3" :color="dialog.color" style="font-size:80px;margin-left:35%;">{{dialog.icon}}</v-icon>
        <v-btn v-if="dialog.color === 'error'" @click="gotoLogIn()" icon flat class="right">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
        <v-card-text class="headline text-xs-center">{{dialog.content}}</v-card-text>
      </v-card>
    </v-dialog>
	<v-flex class="tabCont hidden-sm-and-down">
		<v-tabs centered grow icons-and-text dark color="primary">
    <v-tabs-slider color="accent"></v-tabs-slider>
    <v-tab v-for="(item, i) in profileItems" :key="i" :href="item.href">
      {{item.name}}
      <v-icon>{{item.icon}}</v-icon>
    </v-tab>
    <v-tab-item lazy v-for="(item, i) in profileItems" :key="i" :id="item.ID">
      <v-card class="mt-5 pt-5" flat>
        <v-card-text><component :is="item.component"></component></v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
	</v-flex>
  <v-flex class="hidden-md-and-up pt-5">
  <keep-alive>
    <component :is="active"></component>
  </keep-alive>
  </v-flex>
  </v-layout>
</template>

<script>
// import axios from '~/plugins/axios'
import Loader from '~/components/Loader2'
import PersonalInfo from '~/components/profile/PersonalInfo'
import mixin from '~/mixins/userislogged'
export default {
  name: 'profile',
  components: {
    Loader,
    PersonalInfo
  },
  mixins: [mixin],
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
          component: PersonalInfo
        },
        {
          icon: 'mdi-book-open-variant',
          active: false,
          href: '#tab-2',
          ID: 'tab-2',
          name: 'Portfolio',
          component: 'hello'
        },
        {
          icon: 'mdi-view-dashboard',
          active: false,
          href: '#tab-3',
          ID: 'tab-3',
          name: 'Dashboard',
          component: 'hello'
        },
        {
          icon: 'mdi-account-settings-variant',
          active: false,
          href: '#tab-4',
          ID: 'tab-4',
          name: 'Account Settings',
          component: 'hello'
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
      // this.$store.commit('default/mobileProf', true)
    },
    gotoLogIn () {
      this.dialog.status = false
      if (this.dialog.content === 'User not found, please register.') {
        this.$store.commit('default/index', 'Register')
      } else {
        this.$store.commit('default/index', 'Login')
      }
      this.$router.push('/')
    }
  },
  mounted () {
  },
  computed: {
    loading: {
      get () {
        return this.$store.state.profile.loader
      }
    },
    dialog: {
      get () {
        return this.$store.state.profile.dialog
      }
    },
    drawer: {
      get () {
        return this.$store.state.default.mobileProf
      },
      set (val) {
        this.$store.commit('default/mobileProf', val)
      }
    }
  }
}
</script>

<style scoped>
</style>
