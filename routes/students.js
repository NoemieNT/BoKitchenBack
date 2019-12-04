// const express = require("express");
// const router = new express.Router();
// const studentModel = require("./../models/Student");

// router.get("/students", (req, res) => {
//   studentModel
//     .find()
//     .then(dbRes => {
//       res.status(200).json(dbRes);
//     })
//     .catch(dbErr => {
//       res.status(500).json(dbErr);
//     });
// });

// router.get("/students/:id", (req, res) => {
//   studentModel
//     .findById(req.params.id)
//     .then(dbRes => {
//       res.status(200).json(dbRes);
//     })
//     .catch(dbErr => {
//       res.status(500).json(dbErr);
//     });
// });

// router.post("/students", (req, res) => {
//   studentModel
//     .create(req.body)
//     .then(dbRes => {
//       res.status(200).json(dbRes);
//     })
//     .catch(dbErr => {
//       res.status(500).json(dbErr);
//     });
// });

// module.exports = router;
