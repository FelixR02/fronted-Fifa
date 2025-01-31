<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
          Editar Torneo
        </h1>
  
        <!-- Formulario de edición -->
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form @submit.prevent="updateTournament">
            <!-- Campo para el nombre del torneo -->
            <div class="mb-6">
              <label for="tournament_name" class="block text-gray-700 font-semibold mb-2">Nombre del Torneo</label>
              <input v-model="tournament.tournament_name" type="text" id="tournament_name" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
            </div>
  
            <!-- Campo para la descripción del torneo -->
            <div class="mb-6">
              <label for="description" class="block text-gray-700 font-semibold mb-2">Descripción</label>
              <textarea v-model="tournament.description" id="description" rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
  
            <!-- Campo para el logo del torneo -->
            <div class="mb-6">
              <label for="logo" class="block text-gray-700 font-semibold mb-2">Logo del Torneo</label>
              <input type="file" id="logo" @change="handleLogoUpload"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <div v-if="tournament.logo" class="mt-4">
                <img :src="tournament.logo" alt="Logo del torneo" class="w-24 h-24 object-cover rounded-lg">
              </div>
            </div>
  
            <!-- Botones de acción -->
            <div class="flex justify-end space-x-4">
              <NuxtLink to="/tournaments" class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                Cancelar
              </NuxtLink>
              <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const tournament = ref({
    id: route.params.id,
    tournament_name: '',
    description: '',
    logo: '',
  });
  
  // Cargar los datos del torneo al iniciar la página
  async function loadTournament() {
    try {
      const { data } = await useFetch(`/tournaments/${tournament.value.id}`, {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
      });
      if (data.value) {
        tournament.value = data.value;
      }
    } catch (error) {
      console.error('Error al cargar el torneo:', error);
    }
  }
  
  // Manejar la subida del logo
  function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        tournament.value.logo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Actualizar el torneo
  async function updateTournament() {
    try {
      await $fetch(`/tournaments/${tournament.value.id}`, {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'PUT',
        body: tournament.value,
      });
      alert('Torneo actualizado correctamente');
      router.push('/torneos'); // Redirigir usando el router de Vue
    } catch (error) {
      console.error('Error al actualizar el torneo:', error);
    }
  }
  
  // Cargar los datos del torneo al montar la página
  onMounted(() => {
    loadTournament();
  });
  </script>
  
  <style scoped>
  /* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
  </style>