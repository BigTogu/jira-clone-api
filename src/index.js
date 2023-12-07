import express from "express";
//import morgan from "morgan";
import router from "./routes/index.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

app.use(express.json());
app.use(router);

//Iniciando el servidor, escuchando...
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
