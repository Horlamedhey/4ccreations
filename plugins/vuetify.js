import Vue from 'vue'
import Vuetify from 'vuetify'
// import mdi from '@mdi/font/css/materialdesignicons.min.css'
const mdi = {
  cancel: 'mdi-close-circle',
  close: 'mdi-close',
  delete: 'mdi-close-circle', // delete (e.g. v-chip close)
  success: 'mdi-check-circle',
  info: 'mdi-information',
  warning: 'mdi-exclamation',
  error: 'mdi-alert',
  previous: 'mdi-chevron-left',
  next: 'mdi-chevron-right',
  checked: 'mdi-checkbox-marked',
  unchecked: 'mdi-checkbox-blank-outline',
  indeterminate: 'mdi-minus-box',
  dot: 'mdi-circle', // for carousel
  sort: 'mdi-arrow-up',
  expand: 'mdi-chevron-down',
  append: 'mdi-chevron-down',
  subgroup: 'mdi-menu-down',
  rchecked: 'radio-button-checked',
  runchecked: 'radio-button-unchecked',
  edit: 'pencil'
}
Vue.use(Vuetify, {
  iconfont: mdi,
  icons: {
    mdi
  },
  theme: {
    primary: '#4E008C',
    secondary: '#E80CE8',
    accent: '#FF9A0D',
    error: '#FF0000',
    warning: '#E84C0C',
    info: '#1485CC',
    success: '#00FF48'
  }
})
