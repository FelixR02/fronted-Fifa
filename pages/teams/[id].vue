<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
        Jugadores de {{ team.team_name }}
      </h1>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div
          v-for="(player, index) in players"
          :key="index"
          class="flex items-center border-b border-gray-200 py-4"
        >
          <!-- Ícono de Heroicons -->
          <div class="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>

          <!-- Datos del jugador -->
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-gray-800">{{ player.player_name }}</h2>
            <div class="text-gray-600">
              <p>Partidos jugados: {{ player.games_played }}</p>
              <p>Goles: {{ player.goals }}</p>
              <p>Asistencias: {{ player.assists }}</p>
              <p>Tarjetas: {{ player.tarjets }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const teamId = route.params.id;

// Obtener los datos del equipo
const { data: team } = await useFetch(`/teams/${teamId}`, {
  baseURL: useRuntimeConfig().public.BACKEND_URL,
});

// Obtener los jugadores del equipo
const { data: players } = await useFetch(`/teams/${teamId}/players`, {
  baseURL: useRuntimeConfig().public.BACKEND_URL,
});
</script>

<style scoped>
/* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
</style>