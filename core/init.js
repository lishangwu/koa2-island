const requireDirectory = require('require-directory')
const Router = require('koa-router')


class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
        InitManager.loadEnum()
    }
    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, { visit: whenLoadModule });

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    static loadHttpException(){
        const errors = require('./http-exception')
        global.errs = errors
    }
    static loadConfig(path = ''){
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
    static loadEnum(){
        const enumPath = process.cwd() + '/app/lib/enum.js'
        global.enum = require(enumPath)
    }
}

module.exports = InitManager