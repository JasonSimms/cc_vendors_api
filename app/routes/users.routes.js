module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a user
    router.post("/signup", user.create);
    // router.post("/signup", (input) => console.log('got a user req',input));

  
    // Retrieve all 
    // router.get("/", user.findAll);
    router.get("/", ()=>console.log('i hear you already....'));
   
    // Retrieve a single with id
    // router.get("/:id", user.findOne);
  
    // Update a single with id
    // router.put("/:id", user.update);
  
    // Delete a single with id
    // router.delete("/:id", user.delete);
  
    // Delete All
    // router.delete("/", user.deleteAll);
  
    app.use('/api/user', router);
  };