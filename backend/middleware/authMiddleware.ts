// authMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { errorResponse } from '../helper/responseHelpers'

// Extend Request to include user data
export interface CustomRequest extends Request {
  user?: { userId: string; role: string }
}

// Ensure the JWT_SECRET environment variable is defined
const secretKey = process.env.JWT_SECRET

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in the environment variables.')
}

// Authentication Middleware
export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    errorResponse(res, 401, "Authentication failed: No token provided");
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    errorResponse(res, 401, "Authentication failed: Invalid token format");
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    if (!decoded.role || !decoded.userId) {
      errorResponse(res, 401, "Unauthorized user");
      return;
    }
    // // req.user = { userId: decoded.userId, role: decoded.role };
    // res.locals["id"] = decoded.userId;
    // res.locals["role"] = decoded.role;
    // res.locals["email"] = decoded.email;
    next();
  } catch (error) {
    errorResponse(res, 401, "Invalid or expired token");
  }
};


// Authorization Middleware (Role-based)
export const authorizeRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      errorResponse(res, 401, 'Authentication required')
      return
    }

    if (!roles.includes(req.user.role)) {
      errorResponse(res, 403, 'Forbidden: Insufficient permissions')
      return
    }

    next()
  }
}

// Admin-only Middleware
export const isAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    errorResponse(res, 401, 'Authentication required')
    return
  }

  if (req.user.role !== 'admin') {
    errorResponse(res, 403, 'Forbidden: Admins only')
    return
  }

  next()
}
