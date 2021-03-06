const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
// const flash = require("flash");
const bcrypt = require("bcrypt");
// const protectUserRoute = require("./../middleware/checkLoginStatus");

//SIGN UP
router.post("/signup", (req, res) => {
  console.log("req.body");
  // console.log(req.body);
  userModel
    .findOne({ email: req.body.email })
    .then(dbRes => {
      if (dbRes) {
        console.log("error", "You already have an account, please signin :)");
        // res.redirect("/signin");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashed;
        userModel.create(req.body).then(result => {
          delete result.password;
          req.session.currentUser = result;
          console.log("success", "Welcome");
          res.status(200).json(result);
        });
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

// SIGN IN

router.post("/signin", (req, res) => {
  userModel.findOne({ email: req.body.email }).then(dbRes => {
    if (!dbRes) {
      console.log("error", "Wrong credentials");
    } else {
      if (bcrypt.compareSync(req.body.password, dbRes.password)) {
        console.log("setting the user in session ");
        req.session.currentUser = dbRes;
        console.log(req.session.currentUser);

        const forBrowser = dbRes.toJSON();
        delete forBrowser.password;
        console.log("success", "Welcome", "You have signed in");
        return res.status(200).send(forBrowser);
      } else {
        console.log("error", "wrong credentials");
        return res.status(400).send("Bad credentials");
      }
    }
  });
});

router.get("/is-loggedin", (req, res) => {
  console.log("IS LOGGED IN ?", req.session.currentUser);

  if (req.session.currentUser) {
    return res.status(200).json(req.session.currentUser);
  }
  return res.status(403).json("Unauthorized access");
});

// LOG OUT
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.status(200).json("logged out");
  });
});

// My Account
router.get("/my-account", (req, res) => {
  res.render("myAccount", {
    user: req.session.currentUser
  });
});

router.post("/edit-account/:id", (req, res) => {
  const updateUser = req.body;
  user
    .findOneAndUpdate({ _id: req.params.id }, updateUser, { new: true })
    .then(dbres => {
      req.session.currentUser = dbres;
      res.send(dbres);
    })
    .catch(err => console.log(err));
});

module.exports = router;
