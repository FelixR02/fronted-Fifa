<template>
  <header class="bg-green-600 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <NuxtImg
          src="/images/logo.png"
          alt="Logo del sitio"
          class="h-10 mr-3"
          width="40"
          height="40"
          format="webp"
        />
        <h1 class="text-xl font-bold">FutbolStats</h1>
      </div>
      <nav aria-label="Menú principal">
        <ul class="flex space-x-6">
          <li>
            <NuxtLink to="/" class="hover:text-green-300 transition" aria-current="page">Inicio</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/equipos" class="hover:text-green-300 transition">Equipos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/torneos" class="hover:text-green-300 transition">Torneos</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex-1 flex items-center justify-between ml-8">
         
          <button
            v-if="isAuthenticated"
            @click="handleSignOut"
            class="text-red-100 hover:text-white p-2 rounded-full transition-colors relative group"
            title="Cerrar sesión"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Cerrar sesión
            </span>
          </button>
        </div>

  </header>
</template>
<script setup>

const {signOut, status} = useAuth();
const isOpen = ref(false);

const isAuthenticated = computed(() => status.value === "authenticated");
const handleSignOut = async () => {
  try {
    isOpen.value = false;
    await signOut({ callbackUrl: '/login' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};


</script>
<style scoped>
</style>