import { Router } from "express";

const router = Router();

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
  console.log(req.body);
  const { username, password } = req.body;
  const foundUser = users.find((user) => user.username == username);
  if (foundUser) {
    if (foundUser.password == password) {
      res.json({
        Title: "Conéctando...",
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
