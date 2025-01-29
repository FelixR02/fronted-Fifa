<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Crear Nuevo Equipo
        </h1>
  
        <!-- Formulario para crear equipo -->
        <form @submit.prevent="createTeam" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div class="mb-6">
            <label for="team_name" class="block text-gray-700 font-semibold mb-2">Nombre del Equipo</label>
            <input
              v-model="team.team_name"
              type="text"
              id="team_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
  
          <div class="mb-6">
            <label for="estadium_name" class="block text-gray-700 font-semibold mb-2">Nombre del Estadio</label>
            <input
              v-model="team.estadium_name"
              type="text"
              id="estadium_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
  
          <div class="mb-6">
            <label for="logo" class="block text-gray-700 font-semibold mb-2">URL del Logo</label>
            <input
              v-model="team.logo"
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
              Crear Equipo
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  const team = ref({
    team_name: '',
    estadium_name: '',
    logo: '',
  });
  
  // Función para crear un equipo
  async function createTeam() {
    try {
      const { data } = await useFetch('/teams/', {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'POST',
        body: team.value,
      });
      alert('Equipo creado exitosamente');
      navigateTo('/'); // Redirigir a la página principal
    } catch (error) {
      alert('Error al crear el equipo');
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>