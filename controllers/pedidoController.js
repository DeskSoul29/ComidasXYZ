import pedido from "../models/pedido.js";

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


export const pedidoList = async (req, res, next) => {
    try {
      await pedido
        .find({})
        .then((result) => {
          req.allPedido = result;
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
  
  export const sendPedido = async (req, res, next) => {
    try {
      var { name, week, description, productos } = req.body;
  
      const productosSeleccionados = await Producto.find({
        _id: { $in: productos },
      });
  
      const pedidoSend = new menu({
        name: name,
        description: description,
        day: week,
        products: productosSeleccionados,
      });
  
      await pedidoSend.save().then((result) => {
        if (result) {
          auth.isUser(
            req,
            "Conexión exitosa",
            "Producto Enviada",
            "success",
            false,
            800,
            "/homecajero"
          );
        }
        return next();
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  export var deletePedido = async (req, res, next) => {
    try {
      await menu.findByIdAndDelete(req.params.id).then((result) => {
        auth.isUser(
          req,
          "Conexión exitosa",
          "Eliminado Correctamente",
          "success",
          false,
          800,
          "/homeadmin"
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
  
  export const editPedido = async (req, res, next) => {
    var { name, week, description, productos } = req.body;
  
    const productosSeleccionados = await Producto.find({
      _id: { $in: productos },
    });
    
    await pedido
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
          "/homecajero"
        );
      })
      .catch((error) => console.error(error));
    return next();
  };
  