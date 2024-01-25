const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATA_BASE_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running on PORT:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error(error);
  });
