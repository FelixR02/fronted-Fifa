<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Equipos de Fútbol
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(team, index) in teams"
            :key="index"
            class="bg-white rounded-lg shadow-lg p-6 flex items-center"
          >
            <NuxtImg
              :src="team.logo"
              :alt="`Logo de ${team.name}`"
              class="w-24 h-24 mr-4"
              width="96"
              height="96"
              format="webp"
            />
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">{{ team.name }}</h2>
              <p class="text-gray-600">{{ team.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const teams = ref([
    {
      name: 'Real Madrid',
      description: 'Uno de los clubes más exitosos de Europa.',
      logo: '/images/equipos/Real Madrid.png',
    },
    {
      name: 'FC Barcelona',
      description: 'Conocido por su estilo de juego tiki-taka.',
      logo: '/images/equipos/Barcelona.png',
    },
    {
      name: 'Manchester United',
      description: 'Un club histórico de la Premier League.',
      logo: '/images/equipos/Manchester United.png',
    },
    // Agrega más equipos según sea necesario
  ]);
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>