module.exports = `const express = require("express");
const cors = require("cors");
require("dotenv").config();

const homeRouter = require("./routes/home.router");
const globalError = require("./middlewares/globalError");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

app.use(globalError);

module.exports = app;
`;