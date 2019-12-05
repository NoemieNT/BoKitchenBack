const express = require("express");
const router = new express.Router();
const orderModel = require("./../models/Order");

//DISPLAY ALL THE ORDER RELATED TO THE CUSTOMER
router.get("/orders", (req, res) => {
  orderModel
    // .find({ _id: {req.session.user} })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//DISPLAY ALL THE ORDER RELATED TO A KITCHEN
router.get("/orders", (req, res) => {
  orderModel
    .find({ kitchen: req.body.kitchen })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

//DISPLAY ALL THE ORDER TO BE DELIVER RELATED TO A KITCHEN
router.get("/orders", (req, res) => {
  orderModel
    .find({ kitchen: req.body.kitchen, status: "TO BE DELIVER" })
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

//UPDATE ONE ORDER (ATTRIBUTION D'UN LIVREUR)
router.patch("edit-order/:id", (req, res) => {
  let deliverer = req.session.user;
  orderModel
    .findByIdAndUpdate(
      req.params.id,
      { deliverer: deliverer, status: "TO BE DELIVER" },
      { new: true }
    )
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

//UPDATE ONE ORDER (MODIF STATUT : DELIVERED)
router.patch("edit-order/:id", (req, res) => {
  orderModel
    .findByIdAndUpdate(req.params.id, { status: "DELIVERED" }, { new: true })
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
