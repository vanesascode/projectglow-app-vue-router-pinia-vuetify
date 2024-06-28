import './assets/styles/main.scss';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);

app.use(pinia);

app.use(vuetify);

app.mount('#app');
