require("dotenv").config();
require("./config/mongo");

const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());

server.use(cors("*"));

server.get("/", (req, res) => {
  res.send("ok poto");
});

// ROUTING
const orderRouter = require("./routes/order");
const foodRouter = require("./routes/food");
const tagRouter = require("./routes/tag");
const userRouter = require("./routes/user");

server.use(orderRouter);
server.use(foodRouter);
server.use(tagRouter);
server.use(userRouter);

server.listen(process.env.PORT, () => {
  console.log("simple-backend started @ http://localhost:" + process.env.PORT);
});
