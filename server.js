require("dotenv").config();
require("./config/mongo");

const express = require("express");
const server = express();
const cors = require("cors");
const session = require("express-session"); //sessions make data persist between http calls

server.use(express.json());

/*
Create a session middleware with the given options.
Note:  Session data is not saved in the cookie itself, just the session ID. 
Session data is stored server-side.
*/
server.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

// server.use(function fakeUserSession(req, res, next) {
//   req.session.user = {
//     _id: "5defcd044a3c2bda8e4556a6",
//     role: "admin",
//     firstname: "Noémie",
//     lastname: "Nakab",
//     email: "n@morocorocks.com",
//     password: "12345",
//     address: "100 rue Fake",
//     zipcode: "75018",
//     credits: 1000
//   };
//   next();
// });

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
