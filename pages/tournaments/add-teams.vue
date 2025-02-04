<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <!-- Botón para volver al torneo -->
        <div class="mb-8">
          <NuxtLink :to="`/tournaments/${$route.params.id}`" class="text-blue-600 hover:text-blue-800">
            &larr; Volver al Torneo
          </NuxtLink>
        </div>
  
        <!-- Título de la página -->
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Agregar Equipos al Torneo
        </h1>
  
        <!-- Indicador de carga -->
        <div v-if="loading" class="text-center">
          <p>Cargando equipos...</p>
        </div>
  
        <!-- Lista de equipos disponibles -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(team, index) in availableTeams" :key="index" class="bg-white rounded-lg shadow-lg p-6 flex items-center relative">
            <!-- Logo del equipo -->
            <div v-if="team.logo" class="w-24 h-24 mr-4">
              <NuxtImg :src="team.logo" :alt="`Logo de ${team.team_name}`" class="w-full h-full object-cover rounded-lg" />
            </div>
            <div v-else class="w-24 h-24 mr-4 flex items-center justify-center bg-gray-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
  
            <!-- Nombre del equipo -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">{{ team.team_name }}</h2>
            </div>
  
            <!-- Botón para agregar el equipo al torneo -->
            <button @click="addTeamToTournament(team.id)" class="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const availableTeams = ref([]);
  const loading = ref(true);
  
  // Obtener la lista de equipos disponibles
  const { data: teamsData } = await useFetch('/teams', {
    baseURL: useRuntimeConfig().public.BACKEND_URL,
  });
  
  if (teamsData.value) {
    availableTeams.value = teamsData.value;
  }
  
  loading.value = false;
  
  // Función para agregar un equipo al torneo
  async function addTeamToTournament(teamId) {
    try {
      await $fetch(`/tournaments/${route.params.id}/add-team/${teamId}`, {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'POST',
      });
      alert('Equipo agregado al torneo con éxito');
      navigateTo(`/tournaments/${route.params.id}`);
    } catch (error) {
      console.error('Error al agregar el equipo al torneo:', error);
      alert('Hubo un error al agregar el equipo al torneo');
    }
  }
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>