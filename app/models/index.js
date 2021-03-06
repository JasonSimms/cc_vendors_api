// const dbConfig = require("../config/db.config.js");
const dbConfig = {url: process.env.MONGOATLASS_URL || "mongodb://localhost:27017/cc_api"};


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.vendors = require("./vendor.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.transactions = require("./transaction.model.js")(mongoose);


module.exports = db;
