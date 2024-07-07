<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="PROJECTGLOW" scroll-behavior="hide">
      <template v-slot:prepend>
        <img src="https://i.postimg.cc/d3Q5mhbJ/logo.png" alt="" height="40rem" class="ms-2" />
      </template>
      <template v-slot:append>
        <RouterLink to="/login">
          <v-btn icon="mdi-logout" color="white"></v-btn>
        </RouterLink>
      </template>
    </v-app-bar>

    <v-main class="" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-app>
</template>
