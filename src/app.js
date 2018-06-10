import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router'

export function createApp () {
  // Создаем экземпляр роутера
  const router = createRouter()

  const app = new Vue({
    router,
    render: h => h(App)
  })

  // Возвращаем экземпляр приложения и экземпляр роутера
  return { app, router }
}
