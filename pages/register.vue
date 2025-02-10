<template>
    <div class="container mx-auto p-6 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-6 text-red-600">Registro</h1>
      <form @submit.prevent="register" class="w-full max-w-sm">
        <!-- Campo para el Nombre -->
        <label class="block mb-2 text-white">Nombre</label>
        <input 
          v-model="first_name" 
          type="text" 
          required 
          class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
          placeholder="Ingresa tu nombre"
        />
        
        <!-- Campo para el Apellido -->
        <label class="block mb-2 text-white">Apellido</label>
        <input 
          v-model="last_name" 
          type="text" 
          required 
          class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
          placeholder="Ingresa tu apellido"
        />
        
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
        
        <!-- Botón de Registro -->
        <button 
          type="submit"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Registrarse
        </button>
      </form>
      <!-- Mostrar Errores -->
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      <!-- Enlace para Iniciar Sesión -->
      <p class="mt-4 text-white">
        ¿Ya tienes una cuenta? <NuxtLink to="/login" class="text-red-500 hover:underline">Inicia Sesión</NuxtLink>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from '#app';
  
  definePageMeta({
  auth: false
});
  const config = useRuntimeConfig();
  const error = ref('');
  const router = useRouter();
  const first_name = ref('');
  const last_name = ref('');
  const email = ref('');
  const password = ref('');
  
  const register = async () => {
  try {
    const response = await $fetch(`${config.public.BACKEND_URL}/crearUsuarios`, {
      method: 'POST',
      body: {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value
      }
    });
  
      if (response) {
        router.push('/login'); // Redirigir al usuario a la página de login después del registro
      }
    } catch (err) {
      console.error('Error durante el registro:', err);
      error.value = err.message || 'Error al registrar el usuario. Por favor, intenta de nuevo.';
    }
  };
  </script>