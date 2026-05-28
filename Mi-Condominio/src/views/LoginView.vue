<template>
  <div class="min-h-screen bg-[#050816] text-white flex overflow-hidden relative">

    <Loading v-if="loadingPage" />

    <template v-else>

      <div class="absolute inset-0 overflow-hidden">

        <div
          class="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"
        ></div>

        <div
          class="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-600/20 blur-3xl rounded-full"
        ></div>

        <div
          class="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
        ></div>

      </div>

      <div
        class="hidden lg:flex w-1/2 relative items-center justify-center p-12 z-10"
      >

        <div class="max-w-xl">

          <div class="flex items-center gap-3 mb-10">

            <div class="w-[80px] h-[40px] flex items-center justify-center">

              <img
                :src="icono"
                alt="Mi-Condominio"
                class="w-[80px] h-[40px] object-contain"
              />

            </div>

            <div>

              <h1 class="text-3xl font-bold tracking-wide">
                Mi-Condominio
              </h1>

              <p class="text-gray-400 text-sm">
                Acceso privado del sistema
              </p>

            </div>

          </div>

          <h2 class="text-6xl leading-tight font-black mb-6">

            Accede a tu

            <span
              class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              panel personal
            </span>

            de administración

          </h2>

          <p class="text-gray-300 text-lg leading-relaxed mb-10">

            Sistema privado para un solo administrador.
            Gestiona residentes, pagos, reportes
            e incidencias desde un solo lugar.

          </p>

          <div class="grid grid-cols-2 gap-5">

            <div
              class="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
            >

              <h3 class="text-3xl font-black text-cyan-400">
                24/7
              </h3>

              <p class="text-gray-400 text-sm mt-2">
                Sistema activo
              </p>

            </div>

            <div
              class="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
            >

              <h3 class="text-3xl font-black text-blue-400">
                100%
              </h3>

              <p class="text-gray-400 text-sm mt-2">
                Seguridad privada
              </p>

            </div>

          </div>

        </div>

      </div>

      <div
        class="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-6 lg:p-12"
      >

        <div
          class="w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        >

          <div class="text-center mb-8">

            <div
              class="mx-auto mb-5 w-[80px] h-[40px] flex items-center justify-center"
            >

              <img
                :src="icono"
                alt="Mi-Condominio"
                class="w-[80px] h-[40px] object-contain"
              />

            </div>

            <h2 class="text-4xl font-black mb-2">
              Iniciar sesión
            </h2>

            <p class="text-gray-300">
              Acceso exclusivo del administrador
            </p>

          </div>

          <transition name="fade">

            <div
              v-if="errorMessage"
              class="mb-4 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl"
            >
              {{ errorMessage }}
            </div>

          </transition>

          <form
            @submit.prevent="login"
            class="space-y-5"
          >

            <div>

              <input
                v-model="form.correo"
                type="email"
                placeholder="Correo electrónico"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-500 transition-all"
              />

            </div>

            <div>

              <input
                v-model="form.password"
                type="password"
                placeholder="Contraseña"
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-500 transition-all"
              />

            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >

              <span v-if="loading">
                Verificando acceso...
              </span>

              <span v-else>
                Entrar al panel
              </span>

            </button>

          </form>

          <div
            class="mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-500"
          >
            © 2026 Mi-Condominio — Panel administrativo
          </div>

        </div>

      </div>

    </template>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import icono from '@/assets/page/icono.png'

import Loading from '@/components/Loading.vue'

const router = useRouter()

const loadingPage = ref(true)

const loading = ref(false)

const errorMessage = ref('')

const form = reactive({
  correo: '',
  password: ''
})


onMounted(() => {

  const token = localStorage.getItem('token')

  if (token) {

    router.push('/Panel-Control')

    return
  }

  setTimeout(() => {

    loadingPage.value = false

  }, 2500)

})

const login = async () => {

  errorMessage.value = ''

  if (!form.correo || !form.password) {

    errorMessage.value = 'Completa todos los campos'

    return
  }

  try {

    loading.value = true

    const response = await fetch(
      'http://127.0.0.1:8000/api/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({
          correo: form.correo,
          password: form.password
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {

      errorMessage.value =
        data.message || 'Error al iniciar sesión'

      return
    }

    localStorage.setItem(
      'token',
      data.token
    )

    localStorage.setItem(
      'usuario',
      JSON.stringify(data.usuario)
    )

    router.push('/Panel-Control')

  } catch (error) {

    console.error(error)

    errorMessage.value =
      'Error de conexión con Laravel'

  } finally {

    loading.value = false
  }

}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>