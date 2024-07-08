import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { en, es } from 'vuetify/locale'

// Composables
import { createVuetify } from 'vuetify';

const storedLanguage = localStorage.getItem('language') || 'es-ES';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  locale: {
    locale: storedLanguage,
    fallback: 'es-ES',
    messages: {
      'es-ES': es,
      'en-EN': en
    },
  },
});
