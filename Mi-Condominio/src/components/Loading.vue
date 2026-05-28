<template>
  <div
    class="fixed inset-0 z-[9999] bg-[#050816] flex items-center justify-center overflow-hidden"
  >

    <div class="absolute inset-0 overflow-hidden">

      <div
        class="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"
      ></div>

      <div
        class="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-600/20 blur-3xl rounded-full"
      ></div>

      <div
        class="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
      ></div>

    </div>

    <div class="relative z-10 flex flex-col items-center">

      <img
        :src="icono"
        alt="Mi-Condominio"
        class="w-[500px] h-[250px] object-contain mb-10 animate-pulse"
      />

      <div class="relative flex items-end gap-3 h-36">

        <div class="building h-20 w-16">
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
        </div>

        <div class="building h-32 w-20 scale-110">
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
        </div>

        <div class="building h-24 w-16">
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
          <div class="window"></div>
        </div>

      </div>

      <div class="w-64 h-2 bg-white/10 rounded-full overflow-hidden mt-10">

        <div class="loading-bar h-full rounded-full"></div>

      </div>

      <p class="mt-6 text-gray-300 text-lg tracking-wide font-semibold">
        Cargando Mi-Condominio...
      </p>

      <p class="text-gray-500 text-sm mt-2">
        Inicializando sistema residencial
      </p>

    </div>

  </div>
</template>

<script setup>
import icono from '@/assets/page/icono.png'
</script>

<style scoped>

.building {
  @apply bg-white/10 border border-cyan-400/20 rounded-t-xl backdrop-blur-xl p-2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  animation: float 3s ease-in-out infinite;
}

.building:nth-child(2) {
  animation-delay: .5s;
}

.building:nth-child(3) {
  animation-delay: 1s;
}

.window {
  width: 100%;
  height: 12px;
  border-radius: 4px;
  background: rgba(34, 211, 238, 0.7);
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
  animation: blink 2s infinite;
}

.loading-bar {
  width: 40%;
  background: linear-gradient(
    90deg,
    #06b6d4,
    #3b82f6
  );

  animation: loading 2s infinite ease-in-out;
}

@keyframes loading {

  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(260%);
  }
}

@keyframes blink {

  0%, 100% {
    opacity: .4;
  }

  50% {
    opacity: 1;
  }
}

@keyframes float {

  0%, 100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>