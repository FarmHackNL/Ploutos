import Vue from 'vue'
import App from './App.vue'
import store from './store'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';
import VueApexCharts from 'vue-apexcharts'

// loads the Icon plugin for UIkit
UIkit.use(Icons);

// configure Apex Charts
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({store, 
  render: h => h(App),
}).$mount('#app')
