<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Agregar Jugador
        </h1>
  
        <!-- Formulario para agregar jugador -->
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form @submit.prevent="createPlayer">
            <!-- Campo para el nombre del jugador -->
            <div class="mb-6">
              <label for="player_name" class="block text-gray-700 font-semibold mb-2">Nombre del Jugador</label>
              <input
                v-model="player.player_name"
                type="text"
                id="player_name"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
  
            <!-- Campo para partidos jugados -->
            <div class="mb-6">
              <label for="games_played" class="block text-gray-700 font-semibold mb-2">Partidos Jugados</label>
              <input
                v-model="player.games_played"
                type="number"
                id="games_played"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
  
            <!-- Campo para goles -->
            <div class="mb-6">
              <label for="goals" class="block text-gray-700 font-semibold mb-2">Goles</label>
              <input
                v-model="player.goals"
                type="number"
                id="goals"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
  
            <!-- Campo para asistencias -->
            <div class="mb-6">
              <label for="assists" class="block text-gray-700 font-semibold mb-2">Asistencias</label>
              <input
                v-model="player.assists"
                type="number"
                id="assists"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
  
            <!-- Campo para tarjetas -->
            <div class="mb-6">
              <label for="tarjets" class="block text-gray-700 font-semibold mb-2">Tarjetas</label>
              <input
                v-model="player.tarjets"
                type="number"
                id="tarjets"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
  
            <!-- Campo para teamId (solo si no viene en la URL) -->
            <div v-if="!teamId" class="mb-6">
              <label for="teamId" class="block text-gray-700 font-semibold mb-2">ID del Equipo</label>
              <input
                v-model="player.teamId"
                type="text"
                id="teamId"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
  
            <!-- Botones de acción -->
            <div class="flex justify-end space-x-4">
              <NuxtLink
                :to="`/teams/${teamId || ''}`"
                class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </NuxtLink>
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const router = useRouter();
  
  // Obtener el teamId desde la URL
  const teamId = route.query.teamId;
  
  // Datos del jugador
  const player = ref({
    player_name: '',
    games_played: 0,
    goals: 0,
    assists: 0,
    tarjets: 0,
    teamId: teamId || '', // Asignar el teamId automáticamente si viene en la URL
  });
  
  // Función para crear un jugador
  async function createPlayer() {
    try {
      const response = await $fetch('/players', {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'POST',
        body: player.value,
      });
      alert('Jugador creado correctamente');
      router.push(`/teams/${teamId || ''}`); // Redirigir a la lista de jugadores del equipo
    } catch (error) {
      console.error('Error al crear el jugador:', error);
      alert('Hubo un error al crear el jugador');
    }
  }
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>