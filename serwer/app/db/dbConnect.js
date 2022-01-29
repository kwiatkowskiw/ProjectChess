const mongoose = require('mongoose');
const { database } = require('../config')

//db connect
mongoose.connect(database)

mongoose.connection.on('connected', () => {
    console.log('Baza danych podłączona!!!');
})
    