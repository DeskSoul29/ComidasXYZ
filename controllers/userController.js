import login from "../models/user.js";

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

export const sendUser = async (req, res, next) => {
  try {
    var { name, mail, pass, role } = req.body;
    await login.findOne({ email: mail }).then((result) => {
        console.log(result)
      if (!result) {
        new login({
          name: name,
          email: mail,
          password: pass,
          role: role,
        })
          .save()
          .then((result) => {
            if (result) {
              auth.isUser(
                req,
                "Conexión exitosa",
                "Usuario Creado",
                "success",
                false,
                800,
                "/homeadmin/user"
              );
            }
            return next();
          });
      } else {
        auth.isUser(
          req,
          "Advertencia",
          "Corre Ya registrado",
          "error",
          true,
          false,
          "/homeadmin/user"
        );
        return next();
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export var deleteUser = async (req, res, next) => {
  try {
    await login.findByIdAndDelete(req.params.id).then((result) => {
      auth.isUser(
        req,
        "Conexión exitosa",
        "Eliminado Correctamente",
        "success",
        false,
        800,
        "/homeadmin/user"
      );
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const userList = async (req, res, next) => {
  try {
    await login
      .find({})
      .then((result) => {
        req.allUser = result;
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

export const consultUser = async (req, res, next) => {
  try {
    await login.findOne({_id: { $eq: req.params.id }}).then((result) => {
      if(!result){
        res.redirect("/404");
      }else{
        req.itemUser = result;
      }
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editUser = async (req, res, next) => {
    var { name, mail, pass, role } = req.body;

  await login
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
            name: name,
            email: mail,
            password: pass,
            role: role,
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
        "/homeadmin/user"
      );
    })
    .catch((error) => console.error(error));
  return next();
};
