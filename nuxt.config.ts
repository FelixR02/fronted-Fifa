export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@sidebase/nuxt-auth",
  ],

  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.APP_API_URL, // Variable de entorno para el backend
    },
  },

  auth: {
    baseURL: process.env.APP_API_URL, // URL base de tu backend
    provider: {
      type: "local",
      endpoints: {
        
        signIn: {
          path: "/login",
          method: "post"
        },
        signUp: {
          path: "/usuarios",
          method: "post"
        },
        signOut: {
          path: "/logout",
          method: "post"
        },
        getSession: {
          path: "/me", ///dudas acerca de esto 
          method: "get"
        }
      },
      pages: {
        login: "/login" // Página de inicio de sesión en tu frontend
      },
      session: {
        dataType: {
          id: 'number',
          email: 'string',
          phone_number: 'string',
          username: 'string',
          rol: "'administrador' | 'usuario'",
          //twoFactorEnabled: "boolean", // Opcional según el diseño
        },
        dataResponsePointer: "/" 
      },
      token: {
        signInResponseTokenPointer: "/accessToken", 
        maxAgeInSeconds: 3600, 
        type: "Bearer", 
        headerName: "Authorization" 
      },
      // refresh: {
      //   isEnabled: true, 
      //   endpoint: {
      //     path: '/CheckpointReviews/usuarios/refresh-token', // Ruta para renovar el access token
      //     method: 'post'
      //   },
      //   refreshOnlyToken: true,
      //   token: {
      //     signInResponseRefreshTokenPointer: '/refreshToken', // Ruta al refresh token en la respuesta
      //     refreshRequestTokenPointer: '/refreshToken', // Ruta al token enviado para renovar
      //     maxAgeInSeconds: 86400, // Tiempo de vida del refresh token (1 días)
      //     cookieName: 'refresh_token' // Nombre de la cookie para almacenar el refresh token (opcional)
      //   }
      // }
    },
    globalAppMiddleware: {
      isEnabled: true, // Habilitar middleware global
      allow404WithoutAuth: true // Permitir 404 sin autenticación
    }
  },
    compatibilityDate: '2025-01-15'
});
