<template>
  <div class="min-h-screen bg-[#050816] text-white relative overflow-hidden">

    <DashboardLoading v-if="loadingPage" />

    <template v-else>
      <div class="absolute inset-0 overflow-hidden">

        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"
        ></div>

        <div
          class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-3xl rounded-full"
        ></div>

      </div>

      <div class="relative z-10 flex min-h-screen">

        <aside
          class="w-72 bg-white/5 border-r border-white/10 backdrop-blur-2xl p-8 flex flex-col"
        >

          <div class="mb-12">

            <img
              src="@/assets/page/icono.png"
              class="w-28 mb-4"
            />

            <h2 class="text-2xl font-black">
              Mi-Condominio
            </h2>

            <p class="text-gray-400 text-sm">
              Panel administrativo
            </p>

          </div>

          <nav class="space-y-3 flex-1">

            <button
              class="w-full text-left px-5 py-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/20"
            >
              Dashboard
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Personas
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Departamentos
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Pagos
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Gastos
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Eventos
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Encuestas Live
            </button>

            <button
              class="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              Notificaciones
            </button>

          </nav>

          <div
            class="mt-10 bg-white/5 border border-white/10 rounded-3xl p-5"
          >

            <p class="text-sm text-gray-400">
              Sesión iniciada
            </p>

            <h3 class="font-bold text-lg mt-1">
              {{ usuario?.persona?.nombre || 'Administrador' }}
            </h3>

            <button
              @click="logout"
              class="mt-4 w-full py-3 rounded-2xl bg-red-500/20 border border-red-500/20 text-red-300 hover:bg-red-500/30 transition"
            >
              Cerrar sesión
            </button>

          </div>

        </aside>

        <main class="flex-1 p-10 overflow-y-auto">

          <div class="flex items-center justify-between mb-10">

            <div>

              <h1 class="text-5xl font-black mb-3">
                Panel de Control
              </h1>

              <p class="text-gray-400">
                Bienvenido nuevamente al sistema
              </p>

            </div>

            <div
              class="bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-2xl"
            >
              <p class="text-sm text-cyan-300">
                Sistema en línea
              </p>
            </div>

          </div>

          <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

            <div
              class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >

              <h3 class="text-4xl font-black text-cyan-400">
                120
              </h3>

              <p class="text-gray-400 mt-2">
                Residentes
              </p>

            </div>

            <div
              class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >

              <h3 class="text-4xl font-black text-green-400">
                $45K
              </h3>

              <p class="text-gray-400 mt-2">
                Ingresos
              </p>

            </div>

            <div
              class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >

              <h3 class="text-4xl font-black text-red-400">
                8
              </h3>

              <p class="text-gray-400 mt-2">
                Pagos atrasados
              </p>

            </div>

            <div
              class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >

              <h3 class="text-4xl font-black text-blue-400">
                24/7
              </h3>

              <p class="text-gray-400 mt-2">
                Sistema activo
              </p>

            </div>

          </div>

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">

            <div class="xl:col-span-2">

              <div
                class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-[700px] flex flex-col"
              >

                <div class="flex items-center justify-between mb-6">

                  <div>

                    <h2 class="text-2xl font-black">
                      Chat en tiempo real
                    </h2>

                    <p class="text-gray-400 text-sm">
                      WebSocket Laravel
                    </p>

                  </div>

                  <div
                    class="w-3 h-3 rounded-full bg-green-400 animate-pulse"
                  ></div>

                </div>

                <div
                  ref="messagesContainer"
                  class="flex-1 overflow-y-auto space-y-4 pr-2"
                >

                  <div
                    v-for="msg in mensajes"
                    :key="msg.id"
                    class="bg-white/5 border border-white/10 rounded-2xl p-4"
                  >

                    <div class="flex justify-between mb-2">

                      <span class="font-bold text-cyan-400">
                        {{ msg.remitente.nombre }}
                      </span>

                      <span class="text-xs text-gray-500">
                        {{ msg.fecha }}
                      </span>

                    </div>

                    <p class="text-gray-200">
                      {{ msg.mensaje }}
                    </p>

                  </div>

                </div>

                <form
                  @submit.prevent="enviarMensaje"
                  class="mt-6 flex gap-3"
                >

                  <input
                    v-model="nuevoMensaje"
                    type="text"
                    placeholder="Escribe un mensaje..."
                    class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                  />

                  <button
                    type="submit"
                    class="px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition font-bold"
                  >
                    Enviar
                  </button>

                </form>

              </div>

            </div>

            <div class="space-y-8">

              <div
                class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >

                <h2 class="text-2xl font-black mb-5">
                  Eventos próximos
                </h2>

                <div class="space-y-4">

                  <div
                    class="bg-white/5 rounded-2xl p-4"
                  >

                    <h3 class="font-bold">
                      Asamblea General
                    </h3>

                    <p class="text-sm text-gray-400 mt-1">
                      Viernes • 7:00 PM
                    </p>

                  </div>

                  <div
                    class="bg-white/5 rounded-2xl p-4"
                  >

                    <h3 class="font-bold">
                      Mantenimiento piscina
                    </h3>

                    <p class="text-sm text-gray-400 mt-1">
                      Domingo • 10:00 AM
                    </p>

                  </div>

                </div>

              </div>

              <div
                class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >

                <h2 class="text-2xl font-black mb-5">
                  Notificaciones
                </h2>

                <div class="space-y-4">

                  <div
                    class="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
                  >

                    <p class="text-red-300 text-sm">
                      8 pagos pendientes este mes
                    </p>

                  </div>

                  <div
                    class="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4"
                  >

                    <p class="text-cyan-300 text-sm">
                      Nuevo mensaje recibido
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </template>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

import { useRouter } from 'vue-router'

import DashboardLoading from '@/components/DashboardLoading.vue'

import echo from '@/services/echo'

const router = useRouter()

const loadingPage = ref(true)

const mensajes = ref([])

const nuevoMensaje = ref('')

const messagesContainer = ref(null)

const token = localStorage.getItem('token')

const usuario = JSON.parse(
  localStorage.getItem('usuario')
)


onMounted(() => {

  setTimeout(() => {

    loadingPage.value = false

  }, 3500)

})


const obtenerMensajes = async () => {

  try {

    const response = await fetch(
      'http://127.0.0.1:8000/api/mensajes',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )

    const data = await response.json()

    mensajes.value = data.data

    scrollBottom()

  } catch (error) {

    console.error(error)
  }
}


const enviarMensaje = async () => {

  if (!nuevoMensaje.value.trim()) return

  try {

    await fetch(
      'http://127.0.0.1:8000/api/mensajes',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({

          remitente: 1,

          destinatario: 2,

          id_depaA: 1,

          id_depaB: 2,

          mensaje: nuevoMensaje.value

        })
      }
    )

    nuevoMensaje.value = ''

  } catch (error) {

    console.error(error)
  }
}


onMounted(() => {

  obtenerMensajes()

  echo.channel('chat')

    .listen('.nuevo.mensaje', (event) => {

      mensajes.value.push(event)

      scrollBottom()

      console.log(event)
    })
})


const scrollBottom = async () => {

  await nextTick()

  if (messagesContainer.value) {

    messagesContainer.value.scrollTop =
      messagesContainer.value.scrollHeight
  }
}


const logout = () => {

  localStorage.removeItem('token')

  localStorage.removeItem('usuario')

  router.push('/')
}
</script>