import { Router } from "express";
import { param, query, body } from "express-validator";

// MIDDLEWARES
import authenticate from "@/middlewares/authenticate";
import validationError from "@/middlewares/validationError";
import authorize from "@/middlewares/authorize";

// CONTROLLERS
import getCurrentUser from "@/controllers/user/get_current_user";

// MODELS
import User from "@/models/user";

const router = Router();

router.get(
  "/current",
  authenticate,
  authorize(["admin", "user"]),
  getCurrentUser
);

export default router;
