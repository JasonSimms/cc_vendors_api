module.exports = app => {
    const vendor = require("../controllers/vendor.controller.js");
  
    var router = require("express").Router();
  
    // Create a Vendor
    router.post("/", vendor.create);
  
    // Retrieve all 
    router.get("/", vendor.findAll);
   
    // Retrieve a single with id
    router.get("/:id", vendor.findOne);
  
    // Update a single with id
    router.put("/:id", vendor.update);
  
    // Delete a single with id
    router.delete("/:id", vendor.delete);
  
    // Delete All
    router.delete("/", vendor.deleteAll);
  
    app.use('/api/vendor', router);
  };