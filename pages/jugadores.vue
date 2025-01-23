<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Jugadores de Fútbol
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(player, index) in players"
            :key="index"
            class="bg-white rounded-lg shadow-lg p-6 flex items-center"
          >
            <UserIcon class="w-24 h-24 mr-4 text-gray-500" />
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">{{ player.name }}</h2>
              <p class="text-gray-600">{{ player.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { UserIcon } from '@heroicons/vue/outline';
  
  const players = ref([
    {
      name: 'Lionel Messi',
      position: 'Delantero',
    },
    {
      name: 'Cristiano Ronaldo',
      position: 'Delantero',
    },
    {
      name: 'Neymar Jr',
      position: 'Delantero',
    },
    // Agrega más jugadores según sea necesario
  ]);
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>