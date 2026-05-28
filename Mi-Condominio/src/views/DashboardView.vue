<template>
  <div class="h-screen bg-[#050816] text-white flex overflow-hidden">
    <aside
      class="w-72 bg-white/5 border-r border-white/10 backdrop-blur-2xl p-8 flex flex-col"
    >

      <img src="@/assets/page/icono.png" class="w-24 mb-5" />

      <h2 class="text-3xl font-black mb-1">
        Mi-Condominio
      </h2>

      <p class="text-gray-400 mb-10">
        Sistema administrativo
      </p>

      <nav class="space-y-3">

        <button
          class="w-full text-left px-5 py-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/20"
        >
          Chat
        </button>

      </nav>

      <div class="mt-auto pt-10">

        <div class="text-sm text-gray-400">
          Sesión iniciada como
        </div>

        <div class="font-bold text-cyan-300 mt-1">
          {{ usuario?.nombre || 'Usuario' }}
        </div>

      </div>

    </aside>

    <main class="flex-1 flex flex-col h-screen overflow-hidden">

      <div
        class="border-b border-white/10 p-6 flex items-center justify-between"
      >

        <div>

          <h1 class="text-4xl font-black">
            Chat del Condominio
          </h1>

          <p class="text-gray-400 mt-1">
            Mensajería en tiempo real
          </p>

        </div>

        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl font-bold transition"
        >
          Cerrar sesión
        </button>

      </div>

      <div
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-8 space-y-5"
      >

        <div
          v-for="msg in mensajes"
          :key="msg.id"
          class="flex"
          :class="
            msg.remitente?.id === usuario?.id_persona
              ? 'justify-end'
              : 'justify-start'
          "
        >

          <div
            class="max-w-xl px-5 py-4 rounded-3xl border"
            :class="
              msg.remitente?.id === usuario?.id_persona
                ? 'bg-cyan-500/20 border-cyan-400/20'
                : 'bg-white/5 border-white/10'
            "
          >

            <div
              class="text-sm font-bold mb-2"
              :class="
                msg.remitente?.id === usuario?.id_persona
                  ? 'text-cyan-300'
                  : 'text-blue-300'
              "
            >

              {{
                msg.remitente?.id === usuario?.id_persona
                  ? 'Tú'
                  : msg.remitente?.nombre || 'Desconocido'
              }}

            </div>

            <p class="text-lg break-words">
              {{ msg.mensaje }}
            </p>

            <div class="text-xs text-gray-400 mt-3">
              {{ formatFecha(msg.fecha) }}
            </div>

          </div>

        </div>

      </div>

      <div class="border-t border-white/10 p-6">

        <form
          @submit.prevent="enviarMensaje"
          class="flex gap-4"
        >

          <input
            v-model="nuevoMensaje"
            type="text"
            placeholder="Escribe un mensaje..."
            class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            type="submit"
            class="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 rounded-2xl font-bold"
          >
            Enviar
          </button>

        </form>

      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Echo from '@/services/echo'

const router = useRouter()

const mensajes = ref([])
const nuevoMensaje = ref('')
const chatContainer = ref(null)


const token = localStorage.getItem('token')

const usuario = JSON.parse(
  localStorage.getItem('usuario')
)


const formatFecha = (f) => {
  return new Date(f).toLocaleString()
}


const scrollBottom = async () => {

  await nextTick()

  if (chatContainer.value) {

    chatContainer.value.scrollTop =
      chatContainer.value.scrollHeight
  }
}


const logout = async () => {

  try {

    await fetch(
      'http://127.0.0.1:8000/api/logout',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

  } catch (error) {

    console.error(error)
  }

  localStorage.removeItem('token')
  localStorage.removeItem('usuario')

  router.push('/login')
}


const cargarMensajes = async () => {

  try {

    const res = await fetch(
      'http://127.0.0.1:8000/api/mensajes',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await res.json()

    console.log(data)

    mensajes.value = data.data || []

    scrollBottom()

  } catch (error) {

    console.error(error)
  }
}


const enviarMensaje = async () => {

  if (!nuevoMensaje.value.trim()) return

  try {

    const res = await fetch(
      'http://127.0.0.1:8000/api/mensajes',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({

          remitente: usuario.id_persona,

          destinatario: usuario.id_persona,

          id_depaA: 1,

          id_depaB: 1,

          mensaje: nuevoMensaje.value
        })
      }
    )

    const data = await res.json()

    console.log(data)

    if (!data.success) return

    mensajes.value.push(data.data)

    nuevoMensaje.value = ''

    scrollBottom()

  } catch (error) {

    console.error(error)
  }
}


onMounted(async () => {

  await cargarMensajes()

  Echo.channel('chat')

    .listen('.nuevo.mensaje', (e) => {

      console.log('WS CHAT:', e)

      if (
        e.remitente?.id === usuario?.id_persona
      ) return

      mensajes.value.push(e)

      scrollBottom()
    })
})
</script>