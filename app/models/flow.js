const bcrypt = require('bcryptjs')

const { sequelize : db } = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

const { Art } = require('./art')
const { Favor } = require('./favor')

class Flow extends Model{

    static async getData(condition, uid){
        console.log(condition)
        const flow = await Flow.findOne(condition)
        if(!flow){
            throw new global.errs.NotFound()
        }
        const art = await Art.getData(flow.art_id, flow.type)
        const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, uid)
        art.setDataValue('index', flow.index)
        art.setDataValue('like_status', likeLatest)

        return art
    }

}
Flow.init({
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'flow'
})

module.exports = {
    Flow
}