const bcrypt = require('bcryptjs')

const { sequelize : db } = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class User extends Model{
    static async verifyEmailPassword(email, plainPassword){
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(!user){
            throw new global.errs.AuthFailed('账号不存在')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不对')
        }
        return user
    }

    static async getUserByOpenid(openid){
        return await User.findOne({where: {openid: openid}})
    }

    static async registerByOpenid(openid){
        return await User.create({
            openid: openid
        })
    }

}

User.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        //观察者模式
        type: Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10)
            //*  原密码 相同， 加密后不相同
            const pwd = bcrypt.hashSync(val, salt) 
            this.setDataValue('password', pwd)
        }
    },
    openid:{
        type: Sequelize.STRING(64),
        unique: true
    }
},{sequelize: db, tableName: 'user'})

module.exports = {
    User
}