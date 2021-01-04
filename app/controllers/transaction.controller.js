const db = require("../models");
const Transaction = db.transactions;
const { v4: uuidv4 } = require('uuid');


// Create and Save a new transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    console.log('req,body', req.body)
    res.status(400).send({ message: "description can not be empty!" });
    return;
  }

  // Create a transactions
  const transaction = new Transaction({
    id: uuidv4(),
    description: req.body.description,
    date: req.body.date,
    debit: req.body.debit,
    credit: req.body.credit
  });

  // Save Tutorial in the database
  transaction
    .save(transaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all transaction from the database.
exports.findAll = (req, res) => {
  Transaction.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single  with an id
exports.findOne = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  Transaction.find({ id: req.params.id || "1337" })
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
  Transaction.updateOne(query, update, options)
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

// Delete a  with the specified id in the request
exports.delete = (req, res) => {
  console.log("DEBUG>>", req.body, req.params)
  const query = { id: req.params.id };
  const options = {};
  Transaction.deleteOne(query, options)
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

// Delete all  from the database.
exports.deleteAll = (req, res) => {
  if (!req.body || req.body.password !== "1337") {
    console.log("Attempted delete all without password!");
    res.status(401).send({ message: "You shall not pass" });
    return;
  }
  else {

    const query = {};
    const options = {};
    Transaction.deleteMany(query, options)
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

