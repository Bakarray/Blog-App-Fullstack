import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import config from "@/config";

import type { CorsOptions } from "cors";

const app = express();

const PORT = config.PORT;

// configure cors
const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
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
      console.log(`CORS error: ${origin} is not allowed by CORS`);
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

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
