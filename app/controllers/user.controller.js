const db = require("../models");
const User = db.users;
const { v4: uuidv4 } = require('uuid');


// Create and Save a new Vendor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    console.log('req,body', req.body)
    res.status(400).send({ message: "username can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    id: uuidv4(),
    username: req.body.username,
    email: req.body.username || null
  });

  // Save User in the database
  User
    .save(user)
    .then(data => {
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

// Find a single Vendor with an id
exports.findOne = (req, res) => {
console.log("Insert More Code")
};

// Update a Vendor by the id in the request
exports.update = (req, res) => {
  console.log("Insert More Code")

};

// Delete a Vendor with the specified id in the request
exports.delete = (req, res) => {
  console.log("Insert More Code")

};

// Delete all vendors from the database.
exports.deleteAll = (req, res) => {
  console.log("Insert More Code")

};

// // Find all published vendors
// exports.findAllPublished = (req, res) => {
//   Vendor.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving vendors."
//       });
//     });
// };
