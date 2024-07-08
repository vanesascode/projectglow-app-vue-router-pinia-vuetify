<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()
const router = useRouter();
const visible = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const userNameValue = ref('');
const passwordValue = ref('mypassword');

const focusInput = () => {
  inputRef.value?.focus();
};

onMounted(() => {
  focusInput();
});

const submitValue = () => {
  try {
    if (!userNameValue.value) {
      inputRef.value?.focus();
      return;
    }
    localStorage.setItem('user', userNameValue.value.trim());
    router.replace({ name: 'ClientsList' });
  } catch (error) {
    console.error(error);
  }
};

const changeLocale = (locale: string) => {
  if (locale === 'es-ES') {
    localStorage.setItem('language', 'en-EN');
  } else {
    localStorage.setItem('language', 'es-ES');
  }
  window.location.reload();
};
</script>

<template>
  <div class="d-flex flex-column align-center">
    <img class="mx-auto py-6 logo" src="@/assets/images/login-logo.png"></img>
 

    <v-card class="mx-auto pa-8 pb-8" elevation="8" max-width="430" rounded="lg">
      <div class="d-flex justify-end ga-4 language-box">
      <button @click="changeLocale('en-EN')">ES</button>
      <button @click="changeLocale('es-ES')">EN</button>
    </div>
      <div class="text-subtitle-1 text-medium-emphasis">{{ $t('login.name') }}</div>

      <v-text-field
        ref="inputRef"
        density="compact"
        :placeholder="$t('login.enter-name')"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="userNameValue"
        @keyup.enter="submitValue"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        {{ $t('login.password') }}

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
        {{ $t('login.forgot-password') }}</a
        >
      </div>

      <v-text-field
        v-model="passwordValue"
        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        :placeholder="$t('login.enter-password')"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card class="mb-10" color="surface-variant" variant="tonal">
       
        <v-card-text class="text-medium-emphasis text-caption  d-flex align-start ga-2">
         {{ $t('login.warning') }}
        </v-card-text>
      </v-card>

      <button class="login-button" @click="submitValue">{{ $t('login.login') }}</button>
    </v-card>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';
.text-caption {
  color: $primary-color !important;
  font-weight: bold;
}

.v-card-text {
  color: white !important;
  font-weight: lighter;
}

// .v-card-text::before {
//   content: '!!! ';
//   color: rgb(183, 62, 62);
//   font-weight: bolder;
// }

.login-button {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: $dark-green;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: $primary-color;
  }
}

.logo {
  height: 7rem;
  margin-top: 3rem;
}

@media screen and (max-width: 600px) {
   .logo {
    height: 6rem;
    margin-top: 1rem;
   }
}

@media screen and (max-width: 400px) {
  .logo {
    height: 5rem;
    margin-top: 0rem;
  }
}

.language-box {
  margin-bottom: 1rem;
  cursor: pointer;
  button {
    &:hover {
    color: $primary-color;
  }
  }
}

.v-card-text::before {
  content: '!!! ';
  color: rgb(183, 62, 62);
  font-weight: bold;
}

</style>
