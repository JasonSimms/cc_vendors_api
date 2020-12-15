// const dbConfig = require("../config/db.config.js");
const dbConfig = process.env.MONGOATLAS_URL;


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.vendors = require("./vendor.model.js")(mongoose);
db.transactions = require("./transaction.model.js")(mongoose);


module.exports = db;
