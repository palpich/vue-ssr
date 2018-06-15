const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const templatePath = resolve('./src/template.html')

const app = express()

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
}

let renderer
let readyPromise
readyPromise = require('./build/setup-dev-server')(
  app,
  templatePath,
  (bundle, options) => {
    renderer = createRenderer(bundle, options)
  }
)

const handleError = (err, res) => {
  if (err.url) {
    res.redirect(err.url)
  } else if(err.code === 404) {
    res.status(404).send('404 | Page Not Found')
  } else {
    // Render Error Page or Redirect
    res.status(500).send('500 | Internal Server Error')
    console.error(`error during render : ${req.url}`)
    console.error(err.stack)
  }
}

app.get('*', (req, res) => {
  // Вот тут создается контекст нашего приложения
  const context = {
    title: 'Helllofff',
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    console.log(err, html)
    if (err) {
      return handleError(err, res)
    }
    res.send(html)
  })
})

app.listen(8080)
