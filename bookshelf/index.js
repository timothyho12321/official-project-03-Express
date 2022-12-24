const knex = require('knex')({
    'client':'mysql',
    'connection':{
        'user':'admin',
        'password':'password123',
        'database':'soap_shop',
        
    }
})

// create bookshelf
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;