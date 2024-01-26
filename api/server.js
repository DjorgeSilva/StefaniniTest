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
app.get("/users", async (req, resp) => {
  const users = await User.find();
  if (!users) {
    return resp.status(404).json({
      code: 404,
      msg: "nenhum usuário cadastrado",
    });
  }
  resp.status(200).json({
    msg: "connected",
    data: users,
  });
});

// Register Route
app.post("/auth/register", async (req, resp) => {
  const { name, age, job, email, password, confirmPassword } = req.body;
  //validate body
  if (!name) {
    return resp.status(400).json({
      code: 400,
      msg: "nome é obrigatório",
    });
  }
  if (!age) {
    return resp.status(400).json({
      code: 400,
      msg: "idade é obrigatório",
    });
  }
  if (!job) {
    return resp.status(400).json({
      code: 400,
      msg: "cargo é obrigatório",
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
      job,
      age,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return resp.status(200).json({
      code: 200,
      msg: "cadastrado com sucesso!",
      data: {
        name: newUser.name,
        age: newUser.age,
        job: newUser.job,
        email: newUser.email,
      },
    });
  } catch (error) {
    return resp.status(400).json(error);
  }
});

// Login Route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  // validation
  if (!email) {
    return res.status(400).json({
      code: 400,
      msg: "email é obrigatório",
    });
  }

  if (!password) {
    return res.status(400).json({
      code: 400,
      msg: "senha é obrigatório",
    });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      code: 400,
      msg: "email inválido",
    });
  }

  // check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      code: 400,
      msg: "senha inválida",
    });
  }
  res.status(200).json({
    code: 200,
    msg: "login efetuado com sucesso",
    data: user,
  });
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
