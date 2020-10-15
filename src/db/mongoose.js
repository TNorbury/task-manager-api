// /mnt/d/tools/mongodb/bin/mongod --dbpath=/mnt/d/mongodb-data
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
