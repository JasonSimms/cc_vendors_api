const { v4: uuidv4 } = require('uuid');


module.exports = mongoose => {
    const Vendor = mongoose.model(
      "vendor",
      mongoose.Schema(
        {
          id: String,
          description: String,
          category: String,
          user: String
        },
        { timestamps: true }
      )
    );
  
    return Vendor;
  };