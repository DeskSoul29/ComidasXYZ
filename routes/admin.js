import { Router } from "express";

import { productsList, sendProduct, deleteProd, consultProd, editProd} from "../controllers/productController.js";
import { menuList, sendMenu, deleteMenu, consultMenu, editMenu } from "../controllers/menuController.js";
import { userList, sendUser, deleteUser, consultUser, editUser } from "../controllers/userController.js";
import { isAuthenticatedAdmin } from "../controllers/authController.js";

const router = Router();


router.get("/", isAuthenticatedAdmin, (req, res) => {
    res.render("Admin/homeAdmin", { alert: false });
  });

  
router.get("/products", isAuthenticatedAdmin, productsList, (req, res) => {
    res.render("Admin/products", { alert: undefined, allProd: req.allProd, });
  });

  router.get("/products/add", isAuthenticatedAdmin, (req, res) => {
    res.render("Admin/addProduct", { alert: undefined});
  });

  router.post("/products/add", isAuthenticatedAdmin, sendProduct, (req, res) => {
    res.render("Admin/addProduct", {alert: req.alert});
  });

  router.get("/products/Delete/:id", isAuthenticatedAdmin, deleteProd, (req, res) => {
    res.render("Admin/products", {alert: req.alert, allProd: undefined});
  });

  router.get("/products/Edit/:id", isAuthenticatedAdmin, consultProd, (req, res) => {
    res.render("Admin/editProduct", {alert: undefined, itemProd: req.itemProd});
  });

  router.post("/products/Edit/:id", isAuthenticatedAdmin, editProd, (req, res) => {
    res.render("Admin/editProduct", {alert: req.alert, itemProd: false});
  });

  router.get("/menu", isAuthenticatedAdmin, menuList, (req, res) => {
    res.render("Admin/menu", { alert: undefined, allMenu: req.allMenu });
  });

  router.get("/menu/add", isAuthenticatedAdmin, productsList, (req, res) => {
    res.render("Admin/addMenu", { alert: undefined, allProd: req.allProd,});
  });

  router.post("/menu/add", isAuthenticatedAdmin, sendMenu, (req, res) => {
    res.render("Admin/addMenu", {alert: req.alert, allProd: undefined});
  });

  router.get("/menu/Delete/:id", isAuthenticatedAdmin, deleteMenu, (req, res) => {
    res.render("Admin/products", {alert: req.alert, allProd: undefined});
  });

  router.get("/menu/Edit/:id", isAuthenticatedAdmin, consultMenu, productsList, (req, res) => {
    res.render("Admin/editMenu", {alert: undefined, itemMenu: req.itemMenu, allProd: req.allProd});
  });

  router.post("/menu/Edit/:id", isAuthenticatedAdmin, editMenu, (req, res) => {
    res.render("Admin/editMenu", {alert: req.alert, itemMenu: false, allProd:false});
  });

  router.get("/user", isAuthenticatedAdmin, userList, (req, res) => {
    res.render("Admin/usuarios", { alert: undefined, allUser: req.allUser });
  });

  router.get("/user/add", isAuthenticatedAdmin,(req, res) => {
    res.render("Admin/addUser", { alert: undefined, });
  });

  router.post("/user/add", isAuthenticatedAdmin, sendUser, (req, res) => {
    res.render("Admin/addUser", {alert: req.alert});
  });

  router.get("/user/Delete/:id", isAuthenticatedAdmin, deleteUser, (req, res) => {
    res.render("Admin/usuarios", {alert: req.alert, allUser: undefined});
  });

  router.get("/user/Edit/:id", isAuthenticatedAdmin, consultUser, (req, res) => {
    res.render("Admin/editUser", {alert: undefined, itemUser: req.itemUser});
  });

  router.post("/user/Edit/:id", isAuthenticatedAdmin, editUser, (req, res) => {
    res.render("Admin/editUser", {alert: req.alert, itemUser: false});
  });
export default router;
