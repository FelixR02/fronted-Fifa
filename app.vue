<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style scoped>

</style>