const express = require("express");
const router = new express.Router();
const foodModel = require("./../models/Food");

//DISPLAY ALL THE MEALS
router.get("/foods", (req, res) => {
  foodModel
    .find()
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//DISPLAY ONE MEAL
router.get("/foods/:id", (req, res) => {
  foodModel
    .findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//CREATE ONE MEAL
router.post("/create-food", (req, res) => {
  foodModel
    .create(req.body)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//DELETE ONE MEAL
router.delete("/delete-food/:id", (req, res) => {
  foodModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//UPDATE ONE MEAL
router.patch("/edit-food/:id", (req, res) => {
  foodModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
