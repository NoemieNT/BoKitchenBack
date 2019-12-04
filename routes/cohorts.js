// const express = require("express");
// const router = new express.Router();
// const cohortModel = require("./../models/Cohort");

// router.get("/cohorts", (req, res) => {
//   cohortModel
//     .find()
//     .then(dbRes => {
//       res.status(200).json(dbRes);
//     })
//     .catch(dbErr => {
//       res.status(500).json(dbErr);
//     });
// });

// router.get("/cohorts/:id", (req, res) => {
//   cohortModel
//     .findById(req.params.id)
//     .then(dbRes => {
//       res.status(200).json(dbRes);
//     })
//     .catch(dbErr => {
//       res.status(500).json(dbErr);
//     });
// });

// router.post("/cohorts", (req, res) => {
//   cohortModel
//     .create(req.body)
//     .then(dbRes => {
//       res.status(200).json(dbRes);
//     })
//     .catch(dbErr => {
//       res.status(500).json(dbErr);
//     });
// });

// module.exports = router;
