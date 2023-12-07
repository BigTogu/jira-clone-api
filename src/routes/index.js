import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/models/index.js";
import bcrypt from "bcrypt";

const router = Router();
const validPassword = (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword);
};

const getToken = (username) => {
  let token = jwt.sign(
    {
      username: username,
    },
    "secret-password",
    { expiresIn: "48h" }
  );
  return token;
};

router.get("/", (req, res) => {
  res.json({
    Title: "Hola mundo usando rutas!",
  });
});

router.get("/register", (req, res) => {
  const { username, password } = req.body;

  User.create({
    username: username,
    password: password,
    email: username,
  })
    .then(() => {
      res.json({
        message: "Usuario creado",
        token: getToken(username),
      });
    })
    .catch((error) => {
      res.json({
        title: `error: ${error}`,
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      validPassword(password, user.password)
        .then((isValidPassword) => {
          if (isValidPassword) return res.json({ token: getToken(username) });

          res.json("Contraseña no válida");
        })
        .catch((error) => {
          res.json({
            Title: error,
          });
        });
    })
    .catch(() => {
      res.json("Usuario no encontrado");
    });
});

export default router;
