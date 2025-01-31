<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
        Editar Jugador
      </h1>

      <!-- Formulario para editar el jugador -->
      <form @submit.prevent="updatePlayer" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <!-- Campo para el nombre del jugador -->
        <div class="mb-6">
          <label for="player_name" class="block text-gray-700 font-semibold mb-2">Nombre del Jugador</label>
          <input
            v-model="player.player_name"
            type="text"
            id="player_name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <!-- Campo para los partidos jugados -->
        <div class="mb-6">
          <label for="games_played" class="block text-gray-700 font-semibold mb-2">Partidos Jugados</label>
          <input
            v-model="player.games_played"
            type="number"
            id="games_played"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <!-- Campo para los goles -->
        <div class="mb-6">
          <label for="goals" class="block text-gray-700 font-semibold mb-2">Goles</label>
          <input
            v-model="player.goals"
            type="number"
            id="goals"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <!-- Campo para las asistencias -->
        <div class="mb-6">
          <label for="assists" class="block text-gray-700 font-semibold mb-2">Asistencias</label>
          <input
            v-model="player.assists"
            type="number"
            id="assists"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <!-- Campo para las tarjetas -->
        <div class="mb-6">
          <label for="tarjets" class="block text-gray-700 font-semibold mb-2">Tarjetas</label>
          <input
            v-model="player.tarjets"
            type="number"
            id="tarjets"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <!-- Botones de acción -->
        <div class="text-center">
          <button
            type="submit"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const teamId = route.params.id;
const playerId = route.params.playerId;

// Estado inicial del jugador
const player = ref({
  player_name: '',
  games_played: 0,
  goals: 0,
  assists: 0,
  tarjets: 0,
});

// Obtener los datos del jugador
const { data } = await useFetch(`/teams/${teamId}/players/${playerId}`, {
  baseURL: useRuntimeConfig().public.BACKEND_URL,
});

// Asignar los datos del jugador si existen
if (data.value) {
  player.value = data.value;
}

// Función para actualizar el jugador
async function updatePlayer() {
  try {
    await $fetch(`/teams/${teamId}/players/${playerId}`, {
      baseURL: useRuntimeConfig().public.BACKEND_URL,
      method: 'PUT',
      body: player.value,
    });
    alert('Jugador actualizado exitosamente');
    navigateTo(`/teams/${teamId}/players`); // Redirigir a la lista de jugadores
  } catch (error) {
    alert('Error al actualizar el jugador');
    console.error(error);
  }
}
</script>

<style scoped>
/* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
</style>