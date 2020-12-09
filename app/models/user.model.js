const { v4: uuidv4 } = require('uuid');


module.exports = mongoose => {
    const Vendor = mongoose.model(
      "vendor",
      mongoose.Schema(
        {
          id: String,
          username: String,
          email: String,
        },
        { timestamps: true }
      )
    );
  
    return Vendor;
  };