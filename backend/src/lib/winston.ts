import winston from "winston";

import config from "@/config";

const { combine, errors, json, colorize, timestamp, align, printf } =
  winston.format;

// Transports array to hold different logging transports
const transports: winston.transport[] = [];

//If app is not running in production, add a console transport
if (config.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // add colors to all log levels
        timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }), // Add timestamps to logs
        align(), // Align log messages
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : "";

          return `${timestamp} [${level}]: ${message}${metaStr}`;
        })
      ),
    })
  );
}

// create a logger instance
const logger = winston.createLogger({
  level: config.LOG_LEVEL || "info", // Set the default logging level to 'info'
  format: combine(timestamp(), errors({ stack: true }), json()), // Use json format for logging
  transports,
  silent: config.NODE_ENV === "test", //Disable logging in test
});

export { logger };
