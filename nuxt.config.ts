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
  app: {
    head: {
      title: "FutbolStats",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Para ver estadísticas de los jugadores de futbol y los equipos que participan en cada torneo alrededor del mundo.",
        },
        { name: "keywords", content: "Futbol, estadísticas, equipos, jugadores" },
        { name: "author", content: "Félix Rodríguez" },
        { property: "og:title", content: "FutbolStats" },
        { property: "og:description", content: "Para ver estadísticas de los jugadores de futbol y los equipos que participan en cada torneo." },
        { property: "og:image", content: "/images/logo.png" }, // Ruta de tu logo
        { property: "og:url", content: "https://fronted-fifa.onrender.com" }, // URL de tu sitio
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
          path: "login",
          method: "post"
        },
        signUp: {
          path: "crearUsuarios",
          method: "post"
        },
        signOut: {
          path: "logout",
          method: "post"
        },
        getSession: {
          path: "me", ///dudas acerca de esto 
          method: "get"
        }
      },
      /*pages: {
        login: "/login" // Página de inicio de sesión en tu frontend
      },*/
      session: {
        dataType: {
          id: 'number',
          first_name: "string",
          last_name: "string",
          email: 'string',
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
      /* refresh: {
         isEnabled: true, 
         endpoint: {
           path: '/refresh-token', // Ruta para renovar el access token
           method: 'post'
         },
         refreshOnlyToken: true,
         token: {
           signInResponseRefreshTokenPointer: '/refreshToken', // Ruta al refresh token en la respuesta
           refreshRequestTokenPointer: '/refreshToken', // Ruta al token enviado para renovar
           maxAgeInSeconds: 86400, // Tiempo de vida del refresh token (1 días)
           cookieName: 'refresh_token' // Nombre de la cookie para almacenar el refresh token (opcional)
         }
       }*/
    },
    globalAppMiddleware: {
      isEnabled: true, // Habilitar middleware global
      allow404WithoutAuth: true, // Permitir 404 sin autenticación
      addDefaultCallbackUrl: true
    }
  },
    compatibilityDate: '2025-01-15'
});
