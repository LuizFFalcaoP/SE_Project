const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require("../model/user");

const {TOKEN_KEY} = process.env;

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "general-receipts-manager",
    version: "1.0.0",
  });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name, email, password)) {
      res.status(400).send("Todos os campos são obrigatórios");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .send("Usuário já existe. Por favor, entre com o seu login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      TOKEN_KEY,
      { expiresIn: "2h" }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)) {
            res.status(400).send("Todos os campos são obrigatórios");
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: user._id, email
                }, TOKEN_KEY, {expiresIn: "2h"}
            );

            user.token = token;

            res.status(200).json(user);
        }

        res.status(400).send("Credenciais inválidas");
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
