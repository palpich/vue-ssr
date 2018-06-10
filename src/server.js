const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(__dirname + '/template.html', 'utf-8')
})

const context = {
  title: 'Helllofff'

}
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: '<div>Hello World. {{ url }}</div>'
  })

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

server.listen(8080)
