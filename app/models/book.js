const util = require('util')
const axios = require('axios')

const { sequelize : db } = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

const { Favor }  =require('./favor')
const { ArtType } = require('../lib/enum')

class Book extends Model{

    constructor(id){
        super()
        this.id = id
    }
    async detail(){
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async getMyFavorBookCount(uid){
        const count = await Favor.count({
            where:{
                type: ArtType.Book,
                uid
            }
        })
        return count
    }

    static async searchFromYuShu(q, start, count, summary=1){
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), start, count, summary)
        console.log(url)
        const detail = await axios.get(url)
        return detail.data
    }



}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    fav_nums:{
        type: Sequelize.INTEGER,
        default: 0
    }
},{
    sequelize: db,
    tableName: 'book'
})

module.exports = {
    Book
}