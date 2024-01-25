const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Home Route
app.get("/", (req, resp) => {
  resp.status(200).json({
    msg: "connected",
  });
});

// Register Route
app.post("/auth/register", async (req, resp) => {
  const { name, email, password, confirmPassword } = req.body;
  //validate body
  if (!name) {
    return resp.status(400).json({
      code: 400,
      msg: "nome é obrigatório",
    });
  }
  if (!email) {
    return resp.status(400).json({
      code: 400,
      msg: "email é obrigatório",
    });
  }
  if (!password) {
    return resp.status(400).json({
      code: 400,
      msg: "senha é obrigatório",
    });
  }
  if (!confirmPassword) {
    return resp.status(400).json({
      code: 400,
      msg: "confirmar senha é obrigatório",
    });
  }

  if (password !== confirmPassword) {
    return resp.status(400).json({
      code: 400,
      msg: "senhas devem ser iguais",
    });
  }

  const user = await User.findOne({
    email,
  });

  if (user) {
    return resp.status(400).json({
      code: 400,
      msg: "email já está cadastrado",
    });
  }

  try {
    const hash = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, hash);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return resp.status(200).json({
      code: 200,
      msg: "cadastrado com sucesso!",
      data: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return resp.status(400).json(error);
  }
});

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
