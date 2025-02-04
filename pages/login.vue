<template>
    <div class="container mx-auto p-6 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-6 text-red-600">Iniciar Sesión</h1>
      <form @submit.prevent="login" class="w-full max-w-sm">
        <!-- Campo para el Nombre de Usuario -->
        <label class="block mb-2 text-white">Nombre de Usuario</label>
        <input 
          v-model="email" 
          type="text" 
          required 
          class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
          placeholder="Ingresa tu usuario"
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
    </div>
  </template>
  
  <script setup>
  
  import { ref } from 'vue';
  import { definePageMeta } from '#imports';
  import { useRuntimeConfig, useRouter } from '#app';
  
  const {signIn, token} = useAuth();
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const config = useRuntimeConfig();
  const router = useRouter();
  const formData = ref({
  email: '',
  password: ''
});
  
const login = async () => {
  try {
    console.log(`${config.public.BACKEND_URL}login`)
    const response = await fetch(`${config.public.BACKEND_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();
    console.log('Respuesta del backend:', data);

    // Verificar si la autenticación se ha realizado con éxito
    if (data.accessToken && data.refreshToken) {
      // Guardar tokens en localStorage o cookies
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Redirigir al usuario
      console.log("Redirigendo al index");
      await router.push('/');
    } else {
      console.error('Error durante el inicio de sesión:', 'No se han recibido tokens de autenticación');
      error.value = 'Credenciales inválidas. Por favor, verifica tus datos.';
    }
  } catch (err) {
    console.error('Error durante el inicio de sesión:', err);
    error.value = err.message || 'Credenciales inválidas. Por favor, verifica tus datos.';
  }
};
  
  // Metadatos de la página para manejar autenticación
  definePageMeta({
    auth: {
      unauthenticatedOnly: true, // Permitir solo a usuarios no autenticados
      navigateAuthenticatedTo: '/', // Redirigir si ya están autenticados
    },
  });
  </script>
  