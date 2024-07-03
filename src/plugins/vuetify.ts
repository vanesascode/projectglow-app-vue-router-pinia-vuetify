import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Composables
import { createVuetify } from 'vuetify';

import config from '../../configuration.json';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: config.defaultTheme,
    themes: {
      ...config.themes,
    },
  },
});
