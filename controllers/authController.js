import login from "../models/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";

var authLogin = (function () {
  var isUser = function (res, title, mess, icon, button, timer, ruta) {
    return res.render("login", {
      alert: true,
      alertTitle: title,
      alertMessage: mess,
      alertIcon: icon,
      showConfirmButton: button,
      timer: timer,
      ruta: ruta,
    });
  };

  var token = function (email, name, role) {
    return jwt.sign(
      {
        email: email,
        name: name,
        role: role,
      },
      process.env.JWT_SECRETO,
      {
        expiresIn: process.env.JWT_TIEMPO_EXPIRA,
      }
    );
  };

  return {
    isUser: isUser,
    token: token,
  };
})();

export const signin = async (req, res) => {
  try {
    const { mail, pass } = req.body;

    if (!mail || !pass) {
      authLogin.isUser(
        res,
        "Advertencia",
        "Ingrese un Usuario y Contraseña",
        "info",
        true,
        false,
        ""
      );
    } else {
      login
        .findOne({ email: mail })
        .then((results) => {
          if (!results || pass != results.password) {
            authLogin.isUser(
              res,
              "Advertencia",
              "Usuario y/o Contraseña Incorrecta",
              "error",
              true,
              false,
              ""
            );
          } else {
            // Inicio de sesión OK
            const token = authLogin.token(results.email, results.name, results.role);
            // Generamos el token SIN fecha de expiracion
            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            authLogin.isUser(
              res,
              "Conexión exitosa",
              "¡BIENVENIDO!",
              "success",
              false,
              800,
              results.role
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login
        .findOne({ email: decodificada.email })
        .then((results) => {
          if (!results) {
            res.clearCookie("jwt");
            return next();
          } else if (results.role == "admin") {
            return res.redirect("/homeadmin");
          } else {
            return res.redirect("/homecajero");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    return next();
  }
};

export const isAuthenticatedAdmin = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login
        .findOne({ email: decodificada.email })
        .then((results) => {
          if (!results) {
            res.clearCookie("jwt");
            res.redirect("/");
          } else if (results.role != "admin") {
            return res.redirect("/homeCajero");
          }
          req.user = results;
          return next();
        });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/");
  }
};

export const isAuthenticatedCajero = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      login
        .findOne({ email: decodificada.email })
        .then((results) => {
          if (!results) {
            res.clearCookie("jwt");
            res.redirect("/");
          } else if (results.role != "cajero") {
            return res.redirect("/homeAdmin");
          }
          req.user = results;
          return next();
        });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/");
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
