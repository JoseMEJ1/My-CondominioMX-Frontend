<template>
  <div
    class="min-h-screen bg-[#050816] text-white flex items-center justify-center relative overflow-hidden"
  >

    <div class="absolute inset-0 overflow-hidden">

      <div
        class="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"
      ></div>

      <div
        class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-3xl rounded-full"
      ></div>

    </div>

    <div class="relative z-10 text-center px-6">

      <h1
        class="text-[120px] md:text-[180px] font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        404
      </h1>

      <h2 class="text-4xl font-black mb-4">
        Página no encontrada
      </h2>

      <p class="text-gray-400 max-w-lg mx-auto mb-10">
        La página que intentas visitar no existe
        o no tienes permisos para acceder.
      </p>

      <button
        @click="router.push('/')"
        class="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-105 transition-all duration-300"
      >
        Volver al login
      </button>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>