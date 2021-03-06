require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

require('./app/models/user')
require('./app/models/classic')

require('./app/models/flow')


const app = new Koa()
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000)