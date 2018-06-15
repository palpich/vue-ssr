import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createRouter } from './router/router'
import { createStore } from './store/store'

export function createApp () {
  // Создаем экземпляр роутера
  const router = createRouter()

  // Создаем экземпляр стора
  const store = createStore()

  // Теперь роутер будет доступен в сторе
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // Возвращаем экземпляр приложения и экземпляр роутера
  return { app, router, store }
}
