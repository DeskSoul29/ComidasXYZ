import { Router } from "express";

import {
  isAuthenticatedCajero,
} from "../controllers/authController.js";

import { pedidoList } from "../controllers/pedidoController.js";
const router = Router();

router.get("/", isAuthenticatedCajero, pedidoList, (req, res) => {
  res.render("Cajero/homeCajero", {
    alert: undefined,
    allPedido: req.allPedido,
  });
});

export default router;
