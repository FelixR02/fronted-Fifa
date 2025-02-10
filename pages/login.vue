<template>
  <div class="container mx-auto p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6 text-red-600">Iniciar Sesión</h1>
    <form @submit.prevent="login" class="w-full max-w-sm">
      <!-- Campo para el Email -->
      <label class="block mb-2 text-white">Email</label>
      <input 
        v-model="email" 
        type="email" 
        required 
        class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
        placeholder="Ingresa tu email"
      />
      
      <!-- Campo para la Contraseña -->
      <label class="block mb-2 text-white">Contraseña</label>
      <input 
        v-model="password" 
        type="password" 
        required 
        class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
        placeholder="Ingresa tu contraseña"
      />
      
      <!-- Botón de Inicio de Sesión -->
      <button 
        type="submit"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
      >
        Iniciar Sesión
      </button>
    </form>
    <!-- Mostrar Errores -->
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <!-- Enlace para Registro -->
    <p class="mt-4 text-red">
      ¿No tienes una cuenta? <NuxtLink to="/register" class="text-red-500 hover:underline">Regístrate</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from '#app';
import { useAuth } from '#imports';

const error = ref('');
const router = useRouter();
const email = ref('');
const password = ref('');
const { signIn } = useAuth();

const login = async () => {
  try {
    await signIn(
      { email: email.value, password: password.value },
      { callbackUrl: '/', redirect: true }
    );
  } catch (err) {
    console.error('Error durante el inicio de sesión:', err);
    error.value = err.message || 'Credenciales inválidas. Por favor, verifica tus datos.';
  }
};
</script>