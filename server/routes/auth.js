import { Router } from "express";

import { registerController, loginController } from "../controllers/auth.js";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/validators/index.js";

const router = new Router();

router.post("/register", registerValidator, registerController);

router.post("/login", loginValidator, loginController);

export default router;
