<template>
    <div class="flex flex-col min-h-screen">
      <main class="flex-grow">
        <!-- Aquí va el contenido principal de tu página -->
      </main>
      <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto text-center">
          <p>&copy; 2025 Nuestra Compañia. Todos los Derechos Reservados.</p>
          <nav class="mt-2">
            <NuxtLink to="/" class="mx-2 hover:underline">Politica de Privacidad</NuxtLink>
            <NuxtLink to="/" class="mx-2 hover:underline">Terminos de Servicios</NuxtLink>
            <NuxtLink to="/" class="mx-2 hover:underline">Contactenos</NuxtLink>
          </nav>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { NuxtLink } from '#components'
  </script>
  
  <style scoped>
  /* No additional styles needed for sticky footer */
  </style>