const express = require("express");
const router = new express.Router();
const orderModel = require("./../models/Order");
const food = require("../models/Food");

//CLIENT - DISPLAY ALL THE ORDER RELATED TO THE CUSTOMER
router.get("/customer-orders", (req, res) => {
  orderModel
    .find({ customer: req.session.user })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//LIVREUR - DISPLAY ALL THE ORDER RELATED TO THE DELIVERER
router.get("/deliverer-orders", (req, res) => {
  orderModel
    .find({ deliverer: req.session.user })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//ADMIN - DISPLAY ALL THE ORDER (A fAIRE : FILTRE SUR KITCHEN ET STATUS)
router.get("/all-orders", (req, res) => {
  orderModel
    .find()
    .populate("food")
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//LIVREUR - DISPLAY ALL THE ORDER TO BE DELIVERED (A fAIRE : FILTRE SUR KITCHEN)
router.get("/validated-orders", (req, res) => {
  orderModel
    .find({ status: "VALIDATED" })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//CREATE ONE ORDER
router.post("/create-order", (req, res) => {
  orderModel
    .create(req.body)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//DELETE ONE ORDER IF STATUS IS VALIDATED
router.delete("/delete-order/:id", (req, res) => {
  orderModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//UPDATE ONE ORDER (ATTRIBUTION D'UN LIVREUR / CHANGEMENT DE STATUS)
router.patch("/edit-order/:id", (req, res) => {
  orderModel
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
