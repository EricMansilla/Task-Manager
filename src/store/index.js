import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    }
  },
  mutations: {
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push("/")
    },
    cargar(state, payload) {
      state.tareas = payload
    }
  },
  actions: {
    async setTareas({ commit }, tarea) {
      try {
        const firebaseURL = process.env.VUE_APP_FIREBASE_DB_URL
        const res = await fetch(`${firebaseURL}/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        console.log(dataDB);
      } catch (error) {
        console.error(error);
      }
      commit('set', tarea)
    },
    deleteTareas({ commit }, id) {
      commit('eliminar', id)
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    updateTarea({ commit }, tarea) {
      commit('update', tarea)
    },
    cargarLocalStorage({ commit }) {
    }
  },
  modules: {
  }
})
