import menu from "../models/menu.js";
import Producto from "../models/productos.js";

var auth = (function () {
  var isUser = function (req, title, mess, icon, button, timer, ruta) {
    return (req.alert = [
      {
        alert: true,
        alertTitle: title,
        alertMessage: mess,
        alertIcon: icon,
        showConfirmButton: button,
        timer: timer,
        ruta: ruta,
      },
    ]);
  };

  return {
    isUser: isUser,
  };
})();

export const menuList = async (req, res, next) => {
  try {
    await menu
      .find({})
      .then((result) => {
        req.allMenu = result;
        return next();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export const sendMenu = async (req, res, next) => {
  try {
    var { name, week, description, productos } = req.body;

    const productosSeleccionados = await Producto.find({
      _id: { $in: productos },
    });

    const menuSend = new menu({
      name: name,
      description: description,
      day: week,
      products: productosSeleccionados,
    });

    await menuSend.save().then((result) => {
      if (result) {
        auth.isUser(
          req,
          "Conexión exitosa",
          "Producto Enviada",
          "success",
          false,
          800,
          "/homeadmin/menu"
        );
      }
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export var deleteMenu = async (req, res, next) => {
  try {
    await menu.findByIdAndDelete(req.params.id).then((result) => {
      auth.isUser(
        req,
        "Conexión exitosa",
        "Eliminado Correctamente",
        "success",
        false,
        800,
        "/homeadmin/menu"
      );
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const consultMenu = async (req, res, next) => {
  try {
    await menu.findOne({ _id: { $eq: req.params.id } }).then((result) => {
      if (!result) {
        res.redirect("/404");
      } else {
        req.itemMenu = result;
      }
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editMenu = async (req, res, next) => {
  var { name, week, description, productos } = req.body;

  const productosSeleccionados = await Producto.find({
    _id: { $in: productos },
  });
  
  await menu
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name,
          description: description,
          day: week,
          products: productosSeleccionados,
        },
      },
      { new: true }
    )
    .then((result) => {
      auth.isUser(
        req,
        "Conexión exitosa",
        "Editado Correctamente",
        "success",
        false,
        800,
        "/homeadmin/menu"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
