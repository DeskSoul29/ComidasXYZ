import { Router } from "express";

import {
  signin,
  isAuthenticated,
  logout,
} from "../controllers/authController.js";

const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("login", { alert: false });
});


router.get("/404", (req, res) => {
  res.render("tools/404");
});

router.post("/", signin);

router.get("/logout", logout);

export default router;
