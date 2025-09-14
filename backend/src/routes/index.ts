import { Router } from "express";

const router = Router();

/**
 * Routes
 */
import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/user";

/**
 * Root route
 */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is live",
    status: "ok",
    timeStamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
