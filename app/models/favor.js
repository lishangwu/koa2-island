const bcrypt = require('bcryptjs')


const { sequelize : db } = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

const { Art } = require('./art')



class Favor extends Model{

    static async like(art_id, type, uid){

        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })

        if(favor){
            throw new global.errs.LikeError()
        }

        return db.transaction(async (t) => {
            await Favor.create({
                art_id,
                type,
                uid}, {transaction: t})
            const art = await Art.getData(art_id, type,false)
            await art.increment('fav_nums', {by: 1, transaction: t})
        })

    }
    static async dislike(art_id, type, uid){
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })

        if(!favor){
            throw new global.errs.DislikeError()
        }

        return db.transaction(async (t) => {
            await favor.destroy({
                force: false,
                transaction: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.decrement('fav_nums', {by: 1, transaction: t})
        })
    }

    static async userLikeIt(art_id, type, uid){
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        return favor ? true : false

    }

    static async getMyClassicFavors(uid){
        const arts = await Favor.findAll({
            where:{
                uid,
                type:{
                    [Op.not]:400
                }
            }
        })
        if(!arts){
            throw new global.errs.NotFound()
        }

        return await Art.getList(arts)

    }

    static async getBookFavor(uid, bookID){
        const favorNums = await Favor.count({
            where: {
                art_id:bookID,
                type:400
            }
        })
        const myFavor = await Favor.findOne({
            where:{
                art_id:bookID,
                uid,
                type:400
            }
        })
        return {
            fav_nums:favorNums,
            like_status:myFavor?1:0
        }
    }

}
Favor.init({
    uid:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER,

}, {
    sequelize: db,
    tableName: 'favor'
})


module.exports = {
    Favor
}