<template>
  <div class="flex items-center justify-center gap-3">

    <!-- ROAD -->
    <div class="relative w-24 h-6 overflow-hidden">

      <div class="absolute bottom-0 left-0 w-full h-[2px] bg-white/20"></div>

      <!-- CAR -->
      <div class="absolute left-0 animate-car text-xl">
        🚗
      </div>

    </div>

    <span class="font-semibold text-white">
      Cargando...
    </span>

  </div>
</template>

<style scoped>
@keyframes carMove {
  0% {
    transform: translateX(-30px);
  }

  100% {
    transform: translateX(110px);
  }
}

.animate-car {
  animation: carMove 1.2s linear infinite;
}
</style>