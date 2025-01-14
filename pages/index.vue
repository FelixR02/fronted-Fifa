<!-- pages/index.vue -->
<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-blue-600 mb-4">Bienvenido a la Aplicación de Estadísticas de Fútbol</h1>
        <p class="text-lg text-gray-700 mb-6">
          Aquí puedes encontrar las estadísticas más recientes de tus equipos y jugadores favoritos.
        </p>
        <img
          src="https://via.placeholder.com/600x300.png?text=Estadísticas+de+Fútbol"
          alt="Fútbol"
          class="mb-6 w-full max-w-lg rounded-lg shadow-lg"
        />
        <div class="flex justify-center space-x-4">
          <NuxtLink
            to="/login"
            class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Iniciar Sesión
          </NuxtLink>
          <NuxtLink
            to="/stats"
            class="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            Ver Estadísticas
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Aquí puedes agregar lógica adicional si es necesario
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>