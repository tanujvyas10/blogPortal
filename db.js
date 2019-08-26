const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

const connectdb = (dbname) => {
    return MongoClient.connect(url)
    .then(client => client.db(dbname))
}




const Sequelize=require('sequelize')
const db=new Sequelize({
    dialect: 'sqlite',
    storage: 'auth.db'
})

const Users = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dp: {
        type: Sequelize.STRING
    },
    fbAccessToken: {
        type: Sequelize.STRING
    },
    gAccessToken: {
        type: Sequelize.STRING
    }
})


module.exports = {
    connectdb,
    Users
}