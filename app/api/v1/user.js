const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
const {User} = require('../../models/user')
const {success} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})
/**
*  中间件只在程序启动时初始化一次
*/
router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)  //每个请求有独立的校验
    
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password1'),
        nickname: v.get('body.nickname')
    }

    await User.create(user)
    // throw new global.errs.Success()
    success()
})

module.exports = router