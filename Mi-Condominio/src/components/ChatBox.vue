<template>
  <div
    class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-[650px] flex flex-col"
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
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

import echo from '@/services/echo'

const mensajes = ref([])

const nuevoMensaje = ref('')

const messagesContainer = ref(null)

const token = localStorage.getItem('token')

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

      console.log('Nuevo mensaje:', event)
    })
})


const scrollBottom = async () => {

  await nextTick()

  if (messagesContainer.value) {

    messagesContainer.value.scrollTop =
      messagesContainer.value.scrollHeight
  }
}
</script>