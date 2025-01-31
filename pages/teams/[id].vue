<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
        Jugadores de {{ team.team_name }}
      </h1>

      <!-- Botón para agregar jugador -->
      <div class="text-center mb-8">
        <NuxtLink :to="`/players/created?teamId=${teamId}`"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Agregar Jugador
        </NuxtLink>
      </div>

      <!-- Lista de jugadores -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div v-for="(player, index) in players" :key="index"
          class="flex items-center border-b border-gray-200 py-4 relative">
          <!-- Botones de editar y eliminar -->
          <div class="absolute top-2 right-2 flex space-x-2">
            <!-- Botón de editar -->
            <NuxtLink :to="`/players/edit/${player.id}`"
              class="p-2 text-blue-600 hover:text-blue-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </NuxtLink>

            <!-- Botón de eliminar -->
            <button @click.stop="deletePlayer(player.id)" class="p-2 text-red-600 hover:text-red-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <!-- Ícono de jugador -->
          <div class="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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

// Función para eliminar un jugador
async function deletePlayer(playerId) {
  if (confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
    try {
      await $fetch(`/players/${playerId}`, {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'DELETE',
      });
      // Recargar la lista de jugadores después de eliminar
      players.value = players.value.filter(player => player.id !== playerId);
    } catch (error) {
      console.error('Error al eliminar el jugador:', error);
    }
  }
}
</script>

<style scoped>
/* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
</style>