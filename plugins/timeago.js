import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeago', (value) => {
  return moment(value).fromNow()
})
