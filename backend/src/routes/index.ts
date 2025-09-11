import { Router } from "express";

const router = Router();

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

export default router;
