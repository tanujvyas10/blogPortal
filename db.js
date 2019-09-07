const { MongoClient } = require('mongodb')
// const url = 'mongodb://localhost:27017'
const url = 'mongodb+srv:<user>:<password>@cluster2019-vg1ij.mongodb.net/test?retryWrites=true&w=majority'

const connectdb = (dbname) => {
    return MongoClient.connect(url)
    .then(client => client.db(dbname))
}

module.exports = {
    connectdb
}