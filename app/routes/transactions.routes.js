module.exports = app => {
    const transaction = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // Create a Vendor
    router.post("/", transaction.create);
    router.post("/bulk", transaction.createBulk);
  
    // Retrieve all 
    router.get("/", transaction.findAll);
    // router.get("/", transaction.foo);

   
    // Retrieve a single with id
    // router.get("/:id", transaction.findOne);
  
    // Update a single with id
    router.put("/:id", transaction.update);
  
    // Delete a single with id
    router.delete("/:id", transaction.delete);
  
    // Delete All
    router.delete("/", transaction.deleteAll);
  
    app.use('/api/transaction', router);
  };