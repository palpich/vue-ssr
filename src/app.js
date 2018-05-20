const Vue = require('vue')
const VueServer = require('vue-server-renderer')

const app = new Vue({
  template: '<div>Hello World</div>'
})

const renderer = VueServer.createRenderer()

renderer.renderToString(app)
  .then(html => {
    console.log(html)
  })
  .catch(error => {
    console.log(error)
  })
