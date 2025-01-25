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
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
</style>