const express = require("express");
const router = new express.Router();
const tagModel = require("./../models/Tag");

// CREATE A TAG
router.post("/create-tag", (req, res) => {
  tagModel
    .create(req.body)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//DELETE A TAG
router.delete("/delete-tag/:id", (req, res) => {
  tagModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

module.exports = router;
