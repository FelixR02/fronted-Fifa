<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <!-- Botón para volver a la lista de torneos -->
        <div class="mb-8">
          <NuxtLink to="/tournaments" class="text-blue-600 hover:text-blue-800">
            &larr; Volver a Torneos
          </NuxtLink>
        </div>
  
        <!-- Detalles del torneo -->
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          {{ tournament.tournament_name }}
        </h1>
  
        <!-- Lista de equipos participantes -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(team, index) in teams" :key="index" class="bg-white rounded-lg shadow-lg p-6 flex items-center relative">
            <!-- Botones de editar y eliminar -->
            <div class="absolute top-2 right-2 flex space-x-2">
              <!-- Botón de editar -->
              <NuxtLink :to="`/teams/edit/${team.id}`" class="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </NuxtLink>
  
              <!-- Botón de eliminar -->
              <button @click.stop="deleteTeamFromTournament(team.id)" class="p-2 text-red-600 hover:text-red-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
  
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
          </div>
        </div>
  
        <!-- Botón para agregar equipos al torneo -->
        <div class="text-center mt-8">
          <NuxtLink :to="`/tournaments/${$route.params.id}/add-teams`" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Agregar Equipos
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const tournament = ref({});
  const teams = ref([]);
  
  // Obtener los datos del torneo
  const { data: tournamentData } = await useFetch(`/tournaments/${route.params.id}`, {
    baseURL: useRuntimeConfig().public.BACKEND_URL,
  });
  
  // Obtener los equipos del torneo
  const { data: teamsData } = await useFetch(`/tournaments/${route.params.id}/teams`, {
    baseURL: useRuntimeConfig().public.BACKEND_URL,
  });
  
  if (tournamentData.value) {
    tournament.value = tournamentData.value;
  }
  
  if (teamsData.value) {
    teams.value = teamsData.value;
  }
  
  // Función para eliminar un equipo del torneo
  async function deleteTeamFromTournament(teamId) {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo del torneo?')) {
      try {
        await $fetch(`/tournaments/${route.params.id}/remove-team/${teamId}`, {
          baseURL: useRuntimeConfig().public.BACKEND_URL,
          method: 'DELETE',
        });
        // Recargar la lista de equipos después de eliminar
        teams.value = teams.value.filter(team => team.id !== teamId);
      } catch (error) {
        console.error('Error al eliminar el equipo del torneo:', error);
      }
    }
  }
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>