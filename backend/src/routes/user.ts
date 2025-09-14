import { Router } from "express";
import { param, query, body } from "express-validator";

// MIDDLEWARES
import authenticate from "@/middlewares/authenticate";
import validationError from "@/middlewares/validationError";
import authorize from "@/middlewares/authorize";

// CONTROLLERS
import getCurrentUser from "@/controllers/user/get_current_user";
import updateCurrentUser from "@/controllers/user/update_current_user";
import deleteCurrentUser from "@/controllers/user/delete_current_user";
import getAllUsers from "@/controllers/user/get_all_users";
import getUser from "@/controllers/user/get_user";
import deleteUser from "@/controllers/user/delete_user";

// MODELS
import User from "@/models/user";

const router = Router();

router.get(
  "/current",
  authenticate,
  authorize(["admin", "user"]),
  getCurrentUser
);

router.put(
  "/current",
  authenticate,
  authorize(["admin", "user"]),
  body("username")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Username must be less than 20 characters")
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });

      if (userExists) {
        throw Error("This username is already in use");
      }
    }),
  body("email")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Email must be less than 50 characters")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw Error("This email is already in use");
      }
    }),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("first_name")
    .optional()
    .isLength({ max: 20 })
    .withMessage("First name must be less than 20 characters"),
  body("last_name")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Last name must be less than 20 characters"),
  body(["website", "facebook", "instagram", "linkedin", "x", "youtube"])
    .optional()
    .isURL()
    .withMessage("Invalid URL")
    .isLength({ max: 100 })
    .withMessage("Url must be less than 100 characters"),
  validationError,
  updateCurrentUser
);

router.delete(
  "/current",
  authenticate,
  authorize(["user", "admin"]),
  deleteCurrentUser
);

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive integer"),
  validationError,
  getAllUsers
);

router.get(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  param("userId").notEmpty().isMongoId().withMessage("Invalid user ID"),
  validationError,
  getUser
);

router.delete(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  param("userId").notEmpty().isMongoId().withMessage("Invalid user ID"),
  validationError,
  deleteUser
);
export default router;
