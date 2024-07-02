import toast, { createToastInterface } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
  timeout: 5000,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
};
const toastInterface = createToastInterface(options);

export { toast, options, toastInterface };
