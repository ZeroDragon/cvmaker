const fs = require('fs')
const path = require('path')
const pug = require('pug')
const stylus = require('stylus')

const DIST = path.resolve(__dirname, '../dist/')
const SRC = path.resolve(__dirname, '../src/')

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST)

fs.copyFileSync(path.resolve(SRC, 'app.js'), path.resolve(DIST, 'app.js'))
fs.copyFileSync(path.resolve(SRC, 'avatar.png'), path.resolve(DIST, 'avatar.png'))

const html = pug.renderFile(path.resolve(SRC, 'index.pug'))
fs.writeFileSync(path.resolve(DIST, 'index.html'), html)

const cssFile = fs.readFileSync(path.resolve(SRC, 'styles.styl'), 'utf8')
stylus(cssFile).render((err, css) => {
  if (err) throw err
  fs.writeFileSync(path.resolve(DIST, 'styles.css'), css)
})
