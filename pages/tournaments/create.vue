<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Crear Nuevo Torneo
        </h1>
  
        <!-- Formulario para crear torneo -->
        <form @submit.prevent="createTournament" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div class="mb-6">
            <label for="tournament_name" class="block text-gray-700 font-semibold mb-2">Nombre del Torneo</label>
            <input
              v-model="tournament.tournament_name"
              type="text"
              id="tournament_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
  
          <div class="mb-6">
            <label for="description" class="block text-gray-700 font-semibold mb-2">Descripción</label>
            <input
              v-model="tournament.description"
              type="text"
              id="description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
  
          <div class="mb-6">
            <label for="logo" class="block text-gray-700 font-semibold mb-2">URL del Logo</label>
            <input
              v-model="tournament.logo"
              type="url"
              id="logo"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="https://ejemplo.com/logo.png"
            />
          </div>
  
          <div class="text-center">
            <button
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Torneo
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  // Estado reactivo para el formulario
  const tournament = ref({
    tournament_name: '', // Cambiado de 'name' a 'tournament_name'
    description: '',
    logo: '',
  });
  
  // Función para crear un torneo
  async function createTournament() {
    try {
      const { data } = await useFetch('/tournaments/', {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'POST',
        body: tournament.value,
      });
      alert('Torneo creado exitosamente');
      navigateTo('/torneos'); // Redirigir a la lista de torneos
    } catch (error) {
      alert('Error al crear el torneo');
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>