<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <!-- Botón para volver a la lista de torneos -->
      <div class="mb-8">
        <NuxtLink to="/torneos" class="text-blue-600 hover:text-blue-800">
          &larr; Volver a Torneos
        </NuxtLink>
      </div>

      <!-- Detalles del torneo -->
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
        {{ tournament.tournament_name }}
      </h1>

      <!-- Indicador de carga -->
      <div v-if="loading" class="text-center">
        <p>Cargando equipos...</p>
      </div>

      <!-- Lista de equipos participantes -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(team, index) in teams" :key="index"
          class="bg-white rounded-lg shadow-lg p-6 flex items-center relative">
          <!-- Botones de editar y eliminar -->
          <div class="absolute top-2 right-2 flex space-x-2">
            <!-- Botón de editar -->
            <NuxtLink :to="`/teams/edit/${team.id}`" class="p-2 text-blue-600 hover:text-blue-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </NuxtLink>

            <!-- Botón de eliminar -->
            <button @click.stop="deleteTeamFromTournament(team.id)"
              class="p-2 text-red-600 hover:text-red-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <!-- Logo del equipo -->
          <div v-if="team.logo" class="w-24 h-24 mr-4">
            <NuxtImg :src="team.logo" :alt="`Logo de ${team.team_name}`"
              class="w-full h-full object-cover rounded-lg" />
          </div>
          <div v-else class="w-24 h-24 mr-4 flex items-center justify-center bg-gray-200 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
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

      <!-- Botón para abrir el modal de agregar equipos -->
      <div class="text-center mt-8">
        <button @click="openAddTeamsModal"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Agregar Equipos
        </button>
      </div>

      <!-- Modal para agregar equipos -->
      <div v-if="isAddTeamsModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
          <!-- Título del modal -->
          <h2 class="text-2xl font-bold text-blue-600 mb-6">Agregar Equipos al Torneo</h2>

          <!-- Lista de equipos disponibles -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(team, index) in availableTeams" :key="index"
              class="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <!-- Nombre del equipo -->
              <div class="text-lg font-semibold text-gray-800">{{ team.team_name }}</div>

              <!-- Botón para agregar el equipo -->
              <button @click="addTeamToTournament(team.id)"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Agregar
              </button>
            </div>
          </div>

          <!-- Botón para cerrar el modal -->
          <div class="mt-6 text-right">
            <button @click="closeAddTeamsModal"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const tournament = ref({});
const teams = ref([]);
const availableTeams = ref([]);
const loading = ref(true);
const isAddTeamsModalOpen = ref(false);

// Obtener los datos del torneo
const { data: tournamentData } = await useFetch(`/tournaments/${route.params.id}`, {
  baseURL: useRuntimeConfig().public.BACKEND_URL,
});

// Obtener los equipos del torneo
const { data: teamsData } = await useFetch(`/tournaments/${route.params.id}/teams`, {
  baseURL: useRuntimeConfig().public.BACKEND_URL,
});

// Obtener la lista de equipos disponibles
const { data: allTeamsData } = await useFetch('/teams', {
  baseURL: useRuntimeConfig().public.BACKEND_URL,
});

if (tournamentData.value) {
  tournament.value = tournamentData.value;
}

if (teamsData.value) {
  teams.value = teamsData.value;
}

if (allTeamsData.value) {
  // Acceder a la propiedad `teams` del objeto devuelto por la API
  availableTeams.value = allTeamsData.value.teams.filter(team => 
    !teams.value.some(t => t.id === team.id)
  );
}

loading.value = false;

// Función para abrir el modal
function openAddTeamsModal() {
  isAddTeamsModalOpen.value = true;
}

// Función para cerrar el modal
function closeAddTeamsModal() {
  isAddTeamsModalOpen.value = false;
}

// Función para agregar un equipo al torneo
async function addTeamToTournament(teamId) {
  try {
    await $fetch(`/tournaments/${route.params.id}/add-team/${teamId}`, {
      baseURL: useRuntimeConfig().public.BACKEND_URL,
      method: 'POST',
    });
    alert('Equipo agregado al torneo con éxito');
    
    // Actualizar la lista de equipos en el torneo
    const addedTeam = availableTeams.value.find(team => team.id === teamId);
    teams.value.push(addedTeam);
    
    // Eliminar el equipo de la lista de equipos disponibles
    availableTeams.value = availableTeams.value.filter(team => team.id !== teamId);
  } catch (error) {
    console.error('Error al agregar el equipo al torneo:', error);
    alert('Hubo un error al agregar el equipo al torneo');
  }
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