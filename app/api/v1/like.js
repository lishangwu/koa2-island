const Router = require('koa-router')

const { RegisterValidator, TokenValidator, NotEmptyValidator, LikeValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { Favor } = require('../../models/favor')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')

const { success } = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/like'
})

router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid )
    success()
})

router.post('/dislike',new Auth().m, async (ctx, next)=>{
    const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid )
    success()
})


module.exports = router