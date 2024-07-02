import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { registerPlugins } from '@/plugins';

import { createApp } from 'vue';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
});

const app = createApp(App);

app.use(vuetify);

registerPlugins(app);

app.mount('#app');
