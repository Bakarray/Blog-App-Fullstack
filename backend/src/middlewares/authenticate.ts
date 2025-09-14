import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { verifyAccessToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";

import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";

/**
 * @function authenticate
 * @description Middleware to verify the user's access token from the Authorization header.
 *              If the token is valid, the user's ID is attached to the request object, otherwise, it returns an appropriate error response
 *
 * @param {Request} req - Express request object. Expects a Bearer token in the Authorization header
 *
 * @param {Response} res - Express response object used to send error responses if authentication fails
 *
 * @returns {void}
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      code: "AuthenticationError",
      message: "Access denied, no token provided",
    });
    return;
  }

  const [_, token] = authHeader.split(" ");

  try {
    // Verify the token and extract the userId from the payload
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };

    // Attach the userId to the request object for later use
    req.userId = jwtPayload.userId;

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    // Handle expired token error
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: "AuthenticationError",
        message: "Access token expired, request a new one with refresh token",
      });
      return;
    }

    // Handle invalid token error
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: "AuthenticationError",
        message: "Access token invalid",
      });
      return;
    }

    // Catch-all for other errors
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error: error,
    });

    logger.error("Error during authentication", error);
  }
};

export default authenticate;
