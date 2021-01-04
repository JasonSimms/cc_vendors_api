const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet')
const app = express();


// Middleware
app.use(helmet())

// var corsOptions = {
//   origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// DB connect
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    // process.exit();
  });

// simple route
app.get("/", (req, res) => {
  console.log("thats a get /")
  res.json({ message: "Welcome" });
  // console.log("hello");
});

const authenticate = (key) => {
  if(key = "goodKey")return true;
  else return false
}

const restrict = (req, res, next) => {
  console.log(req.headers)
  if(req.headers.authorization && req.headers.authorization === "goodKey") return next();
  else {
    console.log("Access attempt without authorization header");
    res.status(400).json({ message : "Access Denied without authorization"})
  }
}

app.get("/secret",restrict, (req, res) => res.json({ message : "secret content"}));

require("./app/routes/vendors.routes")(app);
require("./app/routes/transactions.routes")(app);
require("./app/routes/users.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || "default"


app.listen(PORT, () => {
  console.log(`Server is running ENV:${ENV} on port ${PORT}.`);
});
