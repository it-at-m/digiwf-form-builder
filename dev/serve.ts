import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
import vuetify from './plugins/vuetify'
import plugin from '../src/entry'

Vue.config.productionTip = false

Vue.use(plugin);

new Vue({
  vuetify,
  render: (h): VNode => h(Dev),
}).$mount('#app');
