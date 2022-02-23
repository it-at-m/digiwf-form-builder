import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: (h): VNode => h(Dev),
}).$mount('#app');
