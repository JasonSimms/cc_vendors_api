const { v4: uuidv4 } = require('uuid');


module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          id: String,
          username: String,
          email: String,
        },
        { timestamps: true }
      )
    );
  
    return User;
  };