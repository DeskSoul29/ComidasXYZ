import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config/config.js";

import login from "./routes/auth.js";
import admin from "./routes/admin.js";
import cajero from "./routes/cajero.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", PORT);
app.set("views", join(__dirname, "views"));

// Seteamos el motor de plantillas
app.set("view engine", "ejs");

// Seteamos la carpeta public para archivos estáticos
app.use(express.static(join(__dirname, "/public")));

// Para procesar datos enviados desde forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// Seteamos las variables de entorno
dotenv.config({ path: "./env/.env" });

// Para poder trabajar con las cookies
app.use(cookieParser());

// Llamar al router
app.use("/", login);
app.use("/homeadmin", admin);
app.use("/homecajero", cajero);

// Para eliminar la cache
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

// Error 404
app.use((req, res, next) => {
  res.status(404).redirect("/404");
});

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.render("error", {
//     error,
//   });
// });

export default app;