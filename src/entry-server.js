import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // Чтобы сервер знал текущий URL когда будет работать с экземпляром приложения на сервере
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponennts()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      resolve(app)
    }, reject)
  })
}
