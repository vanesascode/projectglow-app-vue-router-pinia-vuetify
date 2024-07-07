import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userName: '',
  }),
  actions: {
    setUserName(value: string) {
      this.userName = value;
    },
  },
});
