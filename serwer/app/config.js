require('dotenv').config();

module.exports = {
    database: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/db_chess',
    port: process.env.PORT || 5000,
}
