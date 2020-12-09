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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

