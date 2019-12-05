const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
// const flash = require("flash");
const bcrypt = require("bcrypt");
// const protectUserRoute = require("./../middleware/checkLoginStatus");

//SIGN UP
router.post("/signup", (req, res) => {
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
          req.session.user = result;
          console.log("success", "Welcome");
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
        req.session.currentUser = dbRes;
        console.log("success", "Welcome");
      }
      console.log("error", "wrong credentials");
    }
  });
});

// LOG OUT
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.locals.isLoggedIn = undefined;
    res.redirect("/signin");
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
