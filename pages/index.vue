<template>
  <div id="app" class="flex flex-col min-h-screen">
    <div class="flex-grow flex flex-col items-center justify-center bg-gray-100">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-blue-600 mb-4">
          Bienvenido a la Aplicación de Estadísticas de Fútbol
        </h1>
        <p class="text-lg text-gray-700 mb-6">
          Aquí puedes encontrar las estadísticas más recientes de tus equipos y jugadores favoritos.
        </p>
      </div>

      <div class="relative w-full max-w-2xl overflow-hidden">
        <div
          v-if="cards[currentCard]"
          class="flex items-center justify-center transition-opacity duration-1500"
        >
          <div class="flex items-center p-8 bg-white rounded-lg shadow-2xl w-full h-64">
            <NuxtImg
              :src="cards[currentCard].image"
              :alt="`Card Image ${currentCard + 1}`"
              class="w-32 h-32 mr-4"
              width="128"
              height="128"
            />
            <p class="text-xl text-gray-700">
              {{ cards[currentCard].text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cards = ref([
  { text: 'Las estadísticas de los jugadores son cruciales para analizar el rendimiento y mejorar las estrategias.', image: '/images/card-157860.svg' },
  { text: 'El fútbol es el mejor deporte del mundo, y las estadísticas lo hacen aún más emocionante.', image: '/images/card-cristiano-ronaldo-cr7-logo-png_seeklogo-326136.png' },
  { text: 'Mantente al día con las estadísticas para seguir el progreso de tus equipos favoritos.', image: '/images/card-d8bb6dc5ecf8241bd7e298e6883f715c-icono-de-campo-de-futbol.webp' },
]);

const currentCard = ref(0);

onMounted(() => {
  setInterval(() => {
    currentCard.value = (currentCard.value + 1) % cards.value.length;
  }, 5000); // Cambia cada 5 segundos
});
</script>

<style scoped>
/* No se necesita CSS adicional, todo se maneja con Tailwind CSS */
</style>