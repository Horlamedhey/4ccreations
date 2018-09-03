  <template>
    <v-app>
      <v-navigation-drawer width="240" clipped hide-overlay v-model="drawer" fixed
                          class="hidden-md-and-up">
        <v-list>
          <v-list-tile @click="homeFn(Home)">
            <v-list-tile-action>
              <v-icon>mdi-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-group class="drawNavItems" v-model="navItem.active"
                        v-for="navItem in navItems" :key="navItem.id"
                        :prepend-icon="navItem.icon">
            <v-list-tile slot="activator">
              <v-list-tile-title class="black--text drawNavItem">{{ navItem.name }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="link(item)" ripple 
                        v-for="item in navItem.navSubItems" :key="item.id" class="items">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app clipped-left class="primary white--text">
        <div>
          <no-ssr>
            <vue-particles style=" width: 100%; height: 100%;
                                  position: absolute; top:0;  left: 0;" color="#ffffff"
                                  :particleOpacity="1" :particlesNumber="300"
                                  shapeType="star" :particleSize="4"
                                  linesColor="#ffffff" :linesWidth="1"
                                  :lineLinked="true" :lineOpacity="0.8"
                                  :linesDistance="100" :moveSpeed="3"
                                  :hoverEffect="true" hoverMode="grab"
                                  :clickEffect="true" clickMode="bubble">
            </vue-particles>
          </no-ssr>
        </div>
        <v-btn @click="draw()" class="hidden-md-and-up" icon><v-icon class="white--text">mdi-menu</v-icon></v-btn>
        <v-toolbar-title class="logo" @click="homeFn(Home)">
          {{ title}}
        </v-toolbar-title>
        <v-tooltip bottom class="ml-3 mr-2 hidden-sm-and-down">
          <span slot="activator" class="searchCont">
            <form class="search-input" action="/static/search.html" method="GET"
                  @click="search1">
              <svg class="search-input__icon" width="42" height="42"
                    viewBox="0 0 32 32" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path class="search-input__path"
                        d="M14.3681591,18.5706017 L11.3928571,21.6 L14.3681591,18.5706017 C13.273867,17.6916019 12.5714286,16.3293241 12.5714286,14.8 C12.5714286,12.1490332 14.6820862,10 17.2857143,10 C19.8893424,10 22,12.1490332 22,14.8 C22,17.4509668 19.8893424,19.6 17.2857143,19.6 C16.1841009,19.6 15.1707389,19.215281 14.3681591,18.5706017 Z"
                        id="icon-svg">

                  </path>
                </g>
              </svg>
              <input id="search1" type="search" name="q"
                    class="white--text search-input__inner" placeholder="Search">
              <button class="input-group-button" href="/static/search.html"
                      type="submit" title="Search"></button>
            </form>
          </span>
          <span>Search</span>
        </v-tooltip>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-menu transition="slide-x-transition" open-on-hover offset-y
                  v-for="navItem in navItems" :key="navItem.id">
            <v-btn flat slot="activator" class="white--text navItems">
              {{ navItem.name }}
            </v-btn>
            <v-list>
              <v-list-tile @click="link(item)" ripple
                          v-for="item in navItem.navSubItems" :key="item.id" class="items">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-spacer class="ml-5"></v-spacer>
        <v-tooltip bottom class="mr-1 hidden-md-and-up">
        	<span class="searchCont" slot="activator">
    			<form class="search-input" action="/static/search.html"
					  method="GET" @click="search2">
      				<svg class="search-input__icon" width="42" height="42"
					  	 viewBox="0 0 32 32" version="1.1"
					  	 xmlns="http://www.w3.org/2000/svg">
          				<g>
							<path class="search-input__path"
                  				  d="M14.3681591,18.5706017 L11.3928571,21.6 L14.3681591,18.5706017 C13.273867,17.6916019 12.5714286,16.3293241 12.5714286,14.8 C12.5714286,12.1490332 14.6820862,10 17.2857143,10 C19.8893424,10 22,12.1490332 22,14.8 C22,17.4509668 19.8893424,19.6 17.2857143,19.6 C16.1841009,19.6 15.1707389,19.215281 14.3681591,18.5706017 Z" id="icon-svg">

          					</path>
						</g>
      				</svg>
      				<input id="search2" type="search" name="q"
						   class="search-input__inner" placeholder="Search">
      				<button class="input-group-button" href="/static/search.html" type="submit" title="Search"></button>
    			</form>
  			</span>
          	<span>Search</span>
        </v-tooltip>
        <v-btn @click="registerFn(Register)" flat class="white--text log hidden-sm-and-down">
          REGISTER
        </v-btn>
        <v-btn @click="logFn()" flat class="white--text log hidden-sm-and-down">
          <span v-if="logStat === false">LOGIN</span>
          <span v-if="logStat === true">LOGOUT</span>
        </v-btn>
        <v-tooltip bottom>
          <v-btn slot="activator" @click="registerFn(Register)" icon flat class="white--text hidden-md-and-up">
            <v-icon>
            mdi-account-plus
            </v-icon>
          </v-btn>
          <span>Register</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" @click="logFn()" icon flat class="white--text hidden-md-and-up">
            <v-icon v-if="logStat === false">
              mdi-login
            </v-icon>
            <v-icon v-if="logStat === true">
              mdi-logout
            </v-icon>
          </v-btn>
          <span v-if="logStat === false">Login</span>
          <span v-if="logStat === true">Logout</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" @click="getProfile()" icon flat
                class="white--text">
            <v-icon>
              mdi-account-circle
            </v-icon>
          </v-btn>
          <span>profile</span>
        </v-tooltip>
        <v-btn v-if="$route.path === '/profile'" @click="$store.commit('default/mobileProf', true)" class="hidden-md-and-up" icon><v-icon class="white--text">mdi-menu</v-icon></v-btn>
      </v-toolbar>
      <v-content>
          <nuxt/>
      </v-content>
      <v-footer fixed app height="auto" class="primary white--text" style="z-index: 999999">
        <span style="display: block; margin: auto; cursor:pointer;" class="align-center" @click="homeFn(Home)">4C-CREATIONS &copy; 2017</span>
      </v-footer>
    </v-app>
  </template>

  <script>
  import axios from '~/plugins/axios.js'
  import Loader from '~/components/Loader'
  export default {
    components: {
      Loader
    },
    data () {
      return {
        fillHeight: true,
        Register: 'Register',
        Login: 'Login',
        Home: 'Home',
        drawer: false,
        navItems: [
          {
            icon: 'mdi-apps',
            active: false,
            name: 'Collections',
            navSubItems: [
              { name: 'Urban Design', link: 'URBAN DESIGN' },
              { name: 'Interior Design', link: 'INTERIOR DESIGN' },
              { name: 'Building Design', link: 'BUILDING DESIGN' },
              { name: 'Landscape Design', link: 'LANDSCAPE DESIGN' },
              {
                name: 'Building Visulization',
                link: 'BUILDING VISUALIZATION'
              },
              { name: 'Green/Sustainable Design', link: 'GREEN/SUSTAINABLE' }
            ]
          },
          {
            icon: 'mdi-account-group',
            active: false,
            name: 'Community',
            navSubItems: [
              { name: 'General' },
              { name: 'Scholars' },
              { name: 'Professionals' }
            ]
          },
          {
            icon: 'mdi-lightbulb-on',
            active: false,
            name: 'Challenges',
            navSubItems: [
              { name: 'Quiz' },
              { name: 'Tests' },
              { name: 'Exams' },
              { name: 'Games' }
            ]
          },
          {
            icon: 'mdi-briefcase',
            active: false,
            name: 'Chances',
            navSubItems: [
              { name: 'IT' },
              { name: 'Jobs' },
              { name: 'Placements' },
              { name: 'Freelancing' }
            ]
          }
        ],
        title: '4C-CREATIONS'
      }
    },
    methods: {
      draw () {
        this.drawer = !this.drawer
        this.$store.commit('default/mobileProf', false)
      },
      link (item) {
        if (item.link) {
          this.$store.commit('populatePostsCat', item.name)
        } else {
          return false
        }
        this.drawer = false
      },
      registerFn (Register) {
        this.$store.commit('default/index', Register)
        this.$router.push('/')
      },
      async logFn () {
        if (this.logStat === false) {
          this.$store.commit('default/index', 'Login')
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        } else if (this.logStat === true) {
          await axios.get('/logout')
            .then(res => {
              this.$cookie.remove('userInfo')
              this.$store.commit('profile/personalInfo')
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }).then(() => {
              this.$store.commit('profile/userIsLogged', false)
              this.$store.commit('default/index', 'Login')
            })
        }
      },
      homeFn (Home) {
        this.$store.commit('default/index', Home)
        this.$router.push('/')
        this.$store.commit('populatePostsCat', 'TRENDS')
      },
      getProfile () {
        this.$router.push('/profile')
      },
      search1 () {
        document.getElementById('search1').focus()
      },
      search2 () {
        document.getElementById('search2').focus()
      }
    },
    computed: {
      logStat: {
        get () {
          return this.$store.state.profile.userIsLogged
        }
      }
    }
  }
  </script>

  <style scoped>
  .searchCont {
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    z-index: 99;
  }
  form {
    height: 42px;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  form:hover input {
    background: #ff9a0d;
  }
  svg {
    stroke: #ffffff;
  }
  g {
    pointer-events: none;
    stroke-width: 1.2;
    fill: none;
  }

  input {
    border: 1px solid rgba(202, 202, 202, 0.6);
    outline: none;
    margin-top: -47px;
    padding: 9px 10px 9px 32px;
    border-radius: 25pc;
    transition: all 0.3s ease-in-out;
    font-size: 16px;
    background: transparent;
    box-shadow: none;
    width: 42px;
    height: 42px;
    color: transparent;
    outline-offset: -2px;
    display: block;
    overflow: visible;
  }

  input:focus {
    width: 180px;
  }
  .log {
    font-size: 0.93rem;
  }
  .navItems:hover {
    border-bottom: 2px #fff solid;
    margin-top: -5px;
  }
  .drawNavItems:hover :first-child {
    color: #fff !important;
  }
  .drawNavItems:hover .drawItem {
    background: #fff !important;
  }
  .drawNavItem {
    transition: 0.2s;
  }
  .logo {
    font-size: 22px;
    cursor: pointer;
    z-index: 99;
  }
  .logo:hover {
    text-shadow: #ddd 2px 2px 4px;
  }
  .items:hover {
    background: #ff9a0d;
  }
  </style>
