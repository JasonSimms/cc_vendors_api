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
  console.log("DEBUG>>", req.body, req.params)
  Vendor.find({ id: req.params.id || "1337" })
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

// Update a Vendor by the id in the request
exports.update = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  const query = { id: req.params.id };
  const update = req.body;
  const options = { new: true };
  Vendor.updateOne(query, update, options)
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

// Delete a Vendor with the specified id in the request
exports.delete = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  const query = { id: req.params.id };
  const options = {};
  Vendor.deleteOne(query, options)
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

// Delete all vendors from the database.
exports.deleteAll = (req, res) => {
  if (!req.body || req.body.password !== "1337") {
    console.log("Attempted delete all without password!");
    res.status(401).send({ message: "You shall not pass" });
    return;
  }
  else {

    const query = {};
    const options = {};
    Vendor.deleteMany(query, options)
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