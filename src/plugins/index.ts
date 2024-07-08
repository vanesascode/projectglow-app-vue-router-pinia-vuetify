// import { loadFonts } from './webfontloader'
import vuetify from './vuetify';
import vueI18n from './i18n';
import router from '@/router';
import { createPinia } from 'pinia';
import { toast, options } from './toastification';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  //   loadFonts()
  app.use(createPinia());
  app.use(router);
  app.use(vueI18n);
  app.use(toast, options);
  app.use(vuetify);
}
