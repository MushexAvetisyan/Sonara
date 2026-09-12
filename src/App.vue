<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app">
    <AppHeader />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
@use './assets/main.scss';
</style>