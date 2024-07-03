// CUSTOM AXIOS INSTANCE

import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { toastInterface, options as toastOptions } from '@/plugins/toastification';
// import vueI18n from '@/plugins/i18n';
import ToastTemplate from '@/components/modals/ToastTemplate.vue';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// httpClient represent the CUSTOM AXIOS INSTANCE created with the options above:

const httpClient: AxiosInstance = axios.create(options);

//The interceptors in the httpClient configuration are middleware functions that can be used to intercept and modify the requests or responses before they are sent or received:

httpClient.interceptors.response.use(
  (response) => {
    console.log('response received successfully', response);
    toastInterface.success('Data fetched sucessfully.');
    return response;
  },
  (error) => {
    console.log('response received failed', error);
    if (error.code === 'ERR_NETWORK') {
      toastInterface.error('Network error occurred.');
    } else if (error.response && error.response.status === 400) {
      ToastTemplate.props.title = 'Bad Request';
      ToastTemplate.props.detail = error.response.data.errors;
      toastInterface.error(ToastTemplate, toastOptions);
    } else if (error.response && error.response.status >= 300) {
      toastInterface.error('Server error occurred.');
    }
    return Promise.reject(error);
  },
);

export { httpClient };
