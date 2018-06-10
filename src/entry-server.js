import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // Чтобы сервер знал текущий URL когда будет работать с экземпляром приложения на сервере
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponennts()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            router: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state

        resolve(app)
      }).catch(reject)

      resolve(app)
    }, reject)
  })
}
