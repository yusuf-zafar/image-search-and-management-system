const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "BHC7DSDD45SSCCS8CSOKAJS68IBS2POJS3M2C";
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
      username: req.body.username,
      password: hashedPassword,
    };

    let user = new User(data);
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    jwt.sign({ result }, secretKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: "jwt sign error" });
      }
      res.status(200).json({ result, auth: token });
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.loginUser = async (req, res) => {
  if (req.body.password && req.body.username) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (user) {
        const isPasswordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (isPasswordMatch) {
          jwt.sign({ user }, secretKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
              res.send({ result: "something went wrong" });
            }
            res.send({ user, auth: token });
          });
        } else {
          res.send({ result: "incorrect password" });
        }
      } else {
        res.send({ result: "no user found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.send({ result: "no user found" });
  }
};
