const server = require('express')()
const createApp = require('./entry-server')
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(__dirname + '/template.html', 'utf-8')
})

server.get('*', (req, res) => {
  // Вот тут создается контекст нашего приложения
  const context = {
    title: 'Helllofff',
    url: req.url
  }

  createApp(context).then(app => {
    renderer.renderToString(app, context)
    .then(html => {
      res.end(html)
    })
    .catch(error => {
      console.log(error)
      res.status(500).end('Внутренняя ошибка сервера')
      return
    })
  })
})

server.listen(8080)
