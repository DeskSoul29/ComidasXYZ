import product from "../models/productos.js";

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

export const sendProduct = async (req, res, next) => {
  try {
    var { name, code, description, cost, iva, prep_time } = req.body;
    await product.findOne({ code: code }).then((result) => {
      if (!result) {
        new product({
          name: name,
          code: code,
          description: description,
          cost: cost,
          iva: iva,
          prep_time: prep_time,
        })
          .save()
          .then((result) => {
            if (result) {
              auth.isUser(
                req,
                "Conexión exitosa",
                "Producto Enviada",
                "success",
                false,
                800,
                "/homeadmin/products"
              );
            }
            return next();
          });
      } else {
        auth.isUser(
          req,
          "Advertencia",
          "Producto Ya registrado",
          "error",
          true,
          false,
          "/homeadmin/products"
        );
        return next();
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export var deleteProd = async (req, res, next) => {
  try {
    await product.findByIdAndDelete(req.params.id).then((result) => {
      auth.isUser(
        req,
        "Conexión exitosa",
        "Eliminado Correctamente",
        "success",
        false,
        800,
        "/homeadmin/products"
      );
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const productsList = async (req, res, next) => {
  try {
    await product
      .find({})
      .then((result) => {
        req.allProd = result;
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

export const consultProd = async (req, res, next) => {
  try {
    await product.findOne({_id: { $eq: req.params.id }}).then((result) => {
      if(!result){
        res.redirect("/404");
      }else{
        req.itemProd = result;
      }
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editProd = async (req, res, next) => {
  var { name, code, description, cost, iva, prep_time } = req.body;

  await product
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name,
          code: code,
          description: description,
          cost: cost,
          iva: iva,
          prep_time: prep_time,
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
        "/homeadmin/products"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
