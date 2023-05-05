import { Router } from "express";

import {
  isAuthenticatedCajero,
} from "../controllers/authController.js";
const router = Router();


router.get("/", isAuthenticatedCajero, (req, res) => {
  res.render("Cajero/homeCajero");
});


  export default router;