const db = require("../models");
const User = db.users;
const { v4: uuidv4 } = require('uuid');


// Create and Save a new s
exports.create = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  // Validate request
  if (req.body.email && !req.body.username) req.body.username = req.body.email

  if (!req.body.username) {
    console.log('req,body', req.body)
    res.status(400).send({ message: "username can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    id: uuidv4(),
    // username: req.body.username,
    email: req.body.username || null
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      console.log('outcome> ', data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vendor."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendors."
      });
    });
};

// Find a single  with an id
exports.findOne = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  User.find({ id: req.params.id || "1337" })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendors."
      });
    });
};

// Update a  by the id in the request
exports.update = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  const query = { id: req.params.id };
  const update = req.body;
  const options = { new: true };
  User.updateOne(query, update, options)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendors."
      });
    });

};

// Delete a with the specified id in the request
exports.delete = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  const query = { id: req.params.id };
  const options = {};
  User.deleteOne(query, options)
    .then(data => {
      if (!data.deletedCount || data.deletedCount !== 1) console.log("Nothing Deleted")
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendors."
      });
    });

};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  if (!req.body || req.body.password !== "1337") {
    console.log("Attempted delete all without password!");
    res.status(401).send({ message: "You shall not pass" });
    return;
  }
  else {

    const query = {};
    const options = {};
    User.deleteMany(query, options)
      .then(data => {
        console.log('DELETE ALL >>', data)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vendors."
        });
      });
  }

};