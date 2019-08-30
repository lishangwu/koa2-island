const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        // createdAt updatedAt // deletedAt
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        //驼峰转下划线
        // underscored: true,
        //否在数据库中创建复数表名
        freezeTableName: false,
        scopes: {
            bh: {
                attributes: {
                    exclude: [
                        'updated_at', 'created_at', 'deleted_at',
                        // 'createdAt', 'updatedAt', 'deletedAt'
                    ]
                }
            }
        }
    },

})

Model.prototype.toJSON = function(){
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    for(let key in data){
        if(key === 'image'){
            if(!data[key].startsWith('http')){
                data[key] = global.config.host = data[key]
            }
        }
    }

    if(isArray(this.exclude)){
        this.exclude.forEach(value => {
            unset(data, value)
        })
    }

    return data
}

sequelize.sync({
    force: false //把原来表删除 重新创建
})

module.exports = {
    sequelize
}