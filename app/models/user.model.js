const { v4: uuidv4, v4 } = require('uuid');
const bcrypt = require("bcryptjs");


module.exports = mongoose => {
    let Schema = mongoose.Schema;

    let userSchema = new Schema({
      id: {type: String, default: v4()},
      username: String,
      email: String,
      password: String
    },
    { timestamps: true })


    // const User = mongoose.model(
    //   "user",
    //   mongoose.Schema(
    //     {
    //       id: String,
    //       username: String,
    //       email: String,
    //       password: String
    //     },
    //     { timestamps: true }
    //   )
    // );

    userSchema.methods.generatePasswordHash = password =>{
      const saltRounds = 5;
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
    }

    userSchema.methods.validatePassword = (password, hashedPassword) => {
      const res = bcrypt.compareSync(password, hashedPassword);
      return res;
    }

    userSchema.statics.fillable = ["username", "email" ];

    userSchema.statics.returnable = [
      "_id",
      "id",
      "email",
      "username",
      "token",
      "timestamps"
    ]

    userSchema.statics.publicReturnable = ["_id", "username", "timestamps"];

    const User = mongoose.model("user", userSchema)
  
    return User;
  };