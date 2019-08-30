const bcrypt = require('bcryptjs')

const { sequelize : db } = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.STRING,
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    },
    title: Sequelize.STRING,
    type: Sequelize.STRING,
}

class Movie extends Model{

}
Movie.init(classicFields, {
    sequelize: db,
    tableName: 'movie'
})

class Sentence extends Model{

}
Sentence.init(classicFields, {
    sequelize: db,
    tableName: 'sentence'
})

const MusicFields = Object.assign({
    url: Sequelize.STRING
}, classicFields)
class Music extends Model{

}
Music.init(MusicFields, {
    sequelize: db,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music,
}