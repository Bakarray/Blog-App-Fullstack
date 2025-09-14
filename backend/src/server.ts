import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import config from "@/config";
import limiter from "@/lib/express_rate_limit";
import { connectToDatabase, disconnectFromDatabase } from "./lib/mongoose";
import { logger } from "@/lib/winston";

import Routes from "@/routes";

import type { CorsOptions } from "cors";

const app = express();

const PORT = config.PORT;

// configure cors
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin || // request has no origin header. e.g, from postman and the likes
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false
      );
      logger.warn(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded  request body parsing with extended mode
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024, // Only compress responses larger than 1kb
  })
);
app.use(helmet());
app.use(limiter);

(async () => {
  try {
    await connectToDatabase();

    app.use("/api", Routes);
    app.listen(PORT, () => {
      logger.info(`Server running on: http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start the server", error);

    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

// Handle server shutdown gracefully
const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn("Server SHUTDOWN");
    process.exit(0);
  } catch (error) {
    logger.error("Error during server shutdown", error);
  }
};

// Listens for termination signals ('SIGTERM' AND 'SIGINT')
process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);
