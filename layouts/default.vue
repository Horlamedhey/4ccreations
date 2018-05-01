<template>
  <v-app>
    <v-navigation-drawer
      clipped
      hide-overlay
      v-model="drawer"
      fixed
      app
      class="hidden-md-and-up"
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>mdi-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
	      <v-divider></v-divider>
        <v-list-group class="drawNavItems"
                      v-model="navItem.active"
		        v-for="navItem in navItems" :key="navItem.id"
                :prepend-icon="navItem.icon"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title class="black--text drawNavItem">{{ navItem.name }}</v-list-tile-title>
          </v-list-tile>
            <v-list-tile ripple @click="" v-for="item in navItem.navSubItems" :key="item.id" class="items">
	            <v-list-tile-content>
		            <v-list-tile-title>{{ item}}</v-list-tile-title>
	            </v-list-tile-content>
            </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left class="primary white--text">
      <v-btn @click="drawer = !drawer" class="hidden-md-and-up" icon><v-icon class="white--text">mdi-menu</v-icon></v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
	    <span class="searchCont">
	<form class="search-input" action="/static/search.html" method="GET">
		<svg class="search-input__icon" width="42" height="42" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<g><path class="search-input__path"
				         d="M14.3681591,18.5706017 L11.3928571,21.6 L14.3681591,18.5706017 C13.273867,17.6916019 12.5714286,16.3293241 12.5714286,14.8 C12.5714286,12.1490332 14.6820862,10 17.2857143,10 C19.8893424,10 22,12.1490332 22,14.8 C22,17.4509668 19.8893424,19.6 17.2857143,19.6 C16.1841009,19.6 15.1707389,19.215281 14.3681591,18.5706017 Z"
				         id="icon-svg">

				</path></g>
		</svg>
		<input type="search" name="q" class="search-input__inner" placeholder="Search">
		<button class="input-group-button" href="/static/search.html" type="submit" title="Search"></button>
	</form>
</span>
    <v-toolbar-items class="hidden-sm-and-down">
	    <v-menu transition="slide-x-transition" open-on-hover offset-y v-for="navItem in navItems" :key="navItem.id">
		    <v-btn flat slot="activator" class="white--text navItems">{{ navItem.name }}</v-btn>
		    <v-list>
			    <v-list-tile ripple @click="" v-for="item in navItem.navSubItems" :key="item.id" class="items">
				    <v-list-tile-content>
					    <v-list-tile-title>{{ item}}</v-list-tile-title>
				    </v-list-tile-content>
			    </v-list-tile>
		    </v-list>
	    </v-menu>
    </v-toolbar-items>
      <v-spacer class="ml-5"></v-spacer>
	    <v-btn icon class="hidden-md-and-up" style="width: 20px;height: 20px;"><v-icon>mdi-search-web</v-icon></v-btn>
	    <v-btn flat class="white--text log hidden-sm-and-down">
		    REGISTER
	    </v-btn>
	    <v-btn flat class="white--text mr-5 log hidden-sm-and-down">
		    LOGIN
	    </v-btn>
	    <v-btn icon flat class="white--text hidden-md-and-up">
		    <v-icon>
				mdi-account-plus
		    </v-icon>
	    </v-btn>
	    <v-btn icon flat class="white--text hidden-md-and-up">
		    <v-icon>
			    mdi-login
		    </v-icon>
	    </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app class="primary white--text" style="z-index: 999999">
      <span style="display: block; margin: auto;" class="align-center">4C-CREATIONS &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      navItems: [
        {
          icon: 'mdi-apps',
          active: false,
          name: 'Collections',
          navSubItems: [
            'Urban Design',
            'Interior Design',
            'Building Design',
            'Landscape Design',
            'Building Visulization',
            'Green/Sustainable Design'
          ]
        },
        {
          icon: 'mdi-account-group',
          active: false,
          name: 'Community',
          navSubItems: ['General', 'Scholars', 'Professionals']
        },
        {
          icon: 'mdi-lightbulb-on',
          active: false,
          name: 'Challenges',
          navSubItems: ['Quiz', 'Tests', 'Exams', 'Games']
        },
        {
          icon: 'mdi-briefcase',
          active: false,
          name: 'Chances',
          navSubItems: ['IT', 'Jobs', 'Placements', 'Freelancing']
        }
      ],
      title: '4C-CREATIONS'
    }
  }
}
</script>

<style scoped>
	.searchCont{
		font-weight: normal;
		line-height: 0;
		-webkit-font-smoothing: antialiased;
	}
	form{
		height: 42px;
		margin: 0;
		line-height: 0;
		padding: 0;
	}
	svg{
		stroke: #171F24;
	}
	g{
		pointer-events: none;
		stroke-width: 1.2;
		fill: none;
	}
	input{
		border: 1px solid rgba(202, 202, 202, 0.6);
		outline: none;
		margin-top: -30px;
		padding: 9px 10px 9px 32px;
		border-radius: 25pc;
		transition: all 0.3s ease-in-out;
		font-size: 16px;
		background: transparent;
		box-shadow: none;
		width: 42px;
		height: 42px;
		color: transparent;
		cursor: pointer;
		outline-offset: -2px;
		display: block;
		overflow: visible;
		line-height: 1.15px;
	}
	.navItems{
		font-size: 16px;
	}
	.log{
		font-size: 0.93rem;
	}
	.navItems:hover{
		border-bottom: 2px #fff solid;
		margin-top: -5px;
	}
	.drawNavItems:hover{
		background: #4E008C;
	}
	.drawNavItem{
		font-size: 1.25rem;
	}
	.drawNavItems:hover :first-child{
		color: #fff!important;
	}
	.drawNavItems:hover .drawItem{
		background: #fff!important;
	}
	.drawNavItem{
		transition: 0.2s;
	}
	.logo{
		font-size: 1.7rem;
		cursor: pointer;
	}
	.logo:hover{
		text-shadow: #ddd 2px 2px 4px;
	}
	.items:hover{
		background: #E80CE8;
	}
</style>
