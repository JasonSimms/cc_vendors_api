const jwt = require("jsonwebtoken");
const User = require("../models/index").users;
const secret = require("../config/db.config").secret;
const _ = require("lodash");

let verifyToken = (token, next) => {
  try {
    console.log("try this ", secret)

    var decoded = jwt.verify(token, secret);
    console.log("try this 2", secret)
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
        console.log("Whatt err/>",err)
      if (err.name === "TokenExpiredError") {
        var decoded = jwt.decode(token);
        if (decoded) {
          return { ...decoded, expired: true };
        } else return false;
      } else return false;
    }
  }
};

let getToken = req =>{
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if(req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
}

let tokenValidation = async (req, res, next) => {
  let token = getToken(req);
  if (token) {
    req.token = token;
    try {
        console.log("here is this...")
      const decodedToken = verifyToken(req.token, next);
      console.log(decodedToken);
      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: "User does not have  token",
        });
      } else if (decodedToken.expired) {
        let decoded = jwt.decode(token);

        let user = await User.findById(decoded._id);

        user.token = jwt.sign(
          {
            id: user._id,
          },
          config.secret,
          {
            expiresIn: "20s",
          }
        );
        req.user = { user, userType: decoded.userType };
        next();
      } else {
        console.log("not expired goo...", decodedToken);
        let user = await User.findById(
          decodedToken.id,
        //   {"username" : "yoMamma"}
        )
        console.log("found a user ?", user)
        user.token = req.token;
        req.user = _.pick(user, User.returnable);
        console.log("all done going to next with req.uesr>>", req.user)
        next();
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Error with your token",
        error: err
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "User does not have  token",
    });
  }
};

module.exports.jwtauth = tokenValidation;