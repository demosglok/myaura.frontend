import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import $http from './http-interceptor.js';

import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

import TalentGetStarted from './components/talent/get-started/talent-get-started.component.vue';

Vue.config.productionTip = false;

Vue.use(SuiVue);

Vue.component('talent-get-started', TalentGetStarted);

new Vue({
   store,
   router,
   $http,
   render: h => h(App)
}).$mount('#app');
