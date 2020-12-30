const db = require("../models");
const Vendor = db.vendors;
const { v4: uuidv4 } = require('uuid');


// Create and Save a new Vendor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    console.log('req,body', req.body)
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Vendor
  const vendor = new Vendor({
    id: uuidv4(),
    description: req.body.description,
    category: req.body.category || "new"
  });

  // Save Vendor in the database
  vendor
    .save(vendor)
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

// Retrieve all vendors from the database.
exports.findAll = (req, res) => {
  Vendor.find()
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

};

// Update a Vendor by the id in the request
exports.update = (req, res) => {

};

// Delete a Vendor with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all vendors from the database.
exports.deleteAll = (req, res) => {

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
