const mongoose = require('mongoose');

module.exports = app => {
    mongoose.connect(process.env.CONNECTION_MONGO_DB, {useNewUrlParser: true, useCreateIndex: true,})

    return mongoose
}