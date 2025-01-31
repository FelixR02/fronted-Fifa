<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
        Equipos de Fútbol
      </h1>

      <!-- Botón para agregar equipo -->
      <div class="text-center mb-8">
        <NuxtLink
          to="/teams/create"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Agregar Equipo
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Tarjeta del equipo -->
        <NuxtLink
          v-for="(team, index) in teams"
          :key="index"
          :to="`/teams/${team.id}`"
          class="bg-white rounded-lg shadow-lg p-6 flex items-center cursor-pointer hover:shadow-xl transition-shadow relative"
        >
          <!-- Botones de editar y eliminar -->
          <div class="absolute top-2 right-2 flex space-x-2">
            <!-- Botón de editar -->
            <NuxtLink
              :to="`/teams/edit/${team.id}`"
              class="p-2 text-blue-600 hover:text-blue-800 transition-colors"
              @click.stop
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </NuxtLink>

            <!-- Botón de eliminar -->
            <button
              @click.stop="deleteTeam(team.id)"
              class="p-2 text-red-600 hover:text-red-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <!-- Logo del equipo -->
          <div v-if="team.logo" class="w-24 h-24 mr-4">
            <NuxtImg
              :src="team.logo"
              :alt="`Logo de ${team.team_name}`"
              class="w-full h-full object-cover rounded-lg"
              width="96"
              height="96"
              format="webp"
            />
          </div>
          <div v-else class="w-24 h-24 mr-4 flex items-center justify-center bg-gray-200 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          <!-- Nombre y estadio del equipo -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800">{{ team.team_name }}</h2>
            <p class="text-gray-600">{{ team.estadium_name }}</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center mt-8">
        <button @click="previousPage" :disabled="page === 1"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2 disabled:bg-gray-400">
          Anterior
        </button>
        <span class="px-4 py-2">{{ page }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2 disabled:bg-gray-400">
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const teams = ref([]);

// Función para cargar los equipos
async function loadTeams() {
  const { data } = await useFetch('/teams/', {
    baseURL: useRuntimeConfig().public.BACKEND_URL,
    query: {
      page: page.value,
      limit: limit.value,
    },
  });

  if (data.value) {
    teams.value = data.value.teams; // Asegúrate de que esto coincida con la respuesta del backend
    totalPages.value = Math.ceil(data.value.total / limit.value);
  }
}

// Cargar equipos al inicio
loadTeams();

// Navegar a la página anterior
function previousPage() {
  if (page.value > 1) {
    page.value--;
    loadTeams();
  }
}

// Navegar a la página siguiente
function nextPage() {
  if (page.value < totalPages.value) {
    page.value++;
    loadTeams();
  }
}

// Función para eliminar un equipo
async function deleteTeam(teamId) {
  if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
    try {
      await $fetch(`/teams/${teamId}`, {
        baseURL: useRuntimeConfig().public.BACKEND_URL,
        method: 'DELETE',
      });
      // Recargar la lista de equipos después de eliminar
      loadTeams();
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
    }
  }
}
</script>

<style scoped>
/* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
</style>