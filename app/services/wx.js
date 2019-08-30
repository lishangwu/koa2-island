const util = require('util')
const axios = require('axios')

const config = require('../../config/config')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXManager{

    static async codeToToken(code){

        const url = util.format(config.wx.loginUrl, config.wx.AppID, config.wx.AppSecret, code)

        const result = await axios.get(url)
        if(result.status !== 200){
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg

        if(errcode && errcode !== 0){
            throw new global.errs.AuthFailed('openid获取失败: ' + errmsg)
        }

        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}