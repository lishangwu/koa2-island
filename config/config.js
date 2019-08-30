module.exports = {
    // prod
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'rootroot'
    },
    security:{
        secretKey: 'abceffg',
        // 1 小时
        expiresIn: 60*60*24
    },
    wx:{
        AppID: 'wx82e9cc19765f295d',
        AppSecret: '789b43a2a6388f154249b3ef3c80b708',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host:'http://localhost:3000/'
}
// GET 
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
