const express = require("express");
const router = new express.Router();
const kitchenModel = require("./../models/kitchenModel");

// CREATE A KITCHEN
router.post("/create-kitchen", (req, res) => {
  kitchenModel
    .create(req.body)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

module.exports = router;
