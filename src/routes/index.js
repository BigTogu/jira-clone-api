import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

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

const users = [
  {
    username: "Togu",
    password: "123",
  },
  {
    username: "Jonasito",
    password: "1234",
  },
  {
    username: "MiniTogu",
    password: "looser",
  },
  {
    username: "Mr.Helper",
    password: "12",
  },
];

router.get("/", (req, res) => {
  res.json({
    Title: "Hola mundo usando rutas!",
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const foundUser = users.find((user) => user.username == username);
  if (foundUser) {
    if (foundUser.password == password) {
      res.json({
        token: getToken(username),
      });
    }
    res.json({
      Title: "Contraseña Incorrecta",
    });
  } else {
    res.json({
      Title: "Usuario No encontrado",
    });
  }
});

export default router;
