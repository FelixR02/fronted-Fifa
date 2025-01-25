<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
        Jugadores de Fútbol
      </h1>
      <div v-if="loading" class="text-center">Cargando...</div>
      <div v-if="error" class="text-center text-red-500">{{ error }}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" v-if="!loading && !error">
        <div
          v-for="(player, index) in players"
          :key="index"
          class="bg-white rounded-lg shadow-lg p-6 flex items-center"
        >
          <div>
            <h2 class="text-2xl font-semibold text-gray-800">{{ player.player_name }}</h2>
            <p class="text-gray-600">Partidos Jugados: {{ player.games_played }}</p>
            <p class="text-gray-600">Goles: {{ player.goals }}</p>
            <p class="text-gray-600">Asistencias: {{ player.assists }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const players = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPlayers = async () => {
  try {
    const response = await $fetch(process.env.APP_API, { // Usando la variable de entorno
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al cargar los jugadores');
    }
    const data = await response.json();
    players.value = data; // Asumiendo que la respuesta es un arreglo de jugadores
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPlayers();
});
</script>

<style scoped>
/* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
</style>