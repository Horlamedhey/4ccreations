<template>
<v-layout>
  <v-navigation-drawer
      right
      clipped
      hide-overlay
      v-model="drawer"
      fixed
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
		<v-tabs fixed-tabs value="tab-1" grow icons-and-text dark color="primary">
    <v-tabs-slider color="accent"></v-tabs-slider>
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
  <v-flex class="hidden-md-and-up pt-5">
  <keep-alive>
    <component :is="active"></component>
  </keep-alive>
  </v-flex>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'
import PersonalInfo from '~/components/profile/PersonalInfo'
import mixin from '~/mixins/userislogged'
export default {
  name: 'profile',
  components: {
    PersonalInfo
  },
  mixins: [mixin],
  data () {
    return {
      dialog: {status: false, color: 'error', icon: 'mdi-account-alert', content: 'User not logged in.'},
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
      // this.$store.commit('default/mobileProf', true)
    },
    async profileAuth () {
      await axios.get('/profileAuth')
        .then(res => {
          if (res.data.auth === false) {
            this.dialog.content = res.data.message
            this.dialog.status = true
          } else {
            this.$store.commit('profile/userIn', res.data)
          }
        // this.infos.forEach((u, i) => {
        //   res.data.forEach((v, j) => {
        //     if (i === j) {
        //       u.content = v
        //     }
        //   })
        })
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
  beforeMount () {
    this.profileAuth()
  },
  computed: {
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
