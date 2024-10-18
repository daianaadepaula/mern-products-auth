import express from "express";
import { login, logout, signup, checkAuth } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 *   /api/auth/signup:
 *     post:
 *       tags: [Auth]
 *       summary: User signup
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 name:
 *                   type: string
 *       responses:
 *         201:
 *           description: User created successfully
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 */
router.post("/signup", signup)

/**
 * @swagger
 *   /api/auth/login:
 *     post:
 *       tags: [Auth]
 *       summary: User login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: Logged in successfully
 *         400:
 *           description: Invalid credentials
 *         500:
 *           description: Internal server error
 */
router.post("/login", login)

/**
 * @swagger
 *   /api/auth/logout:
 *     post:
 *       tags: [Auth]
 *       summary: User logout
 *       responses:
 *         200:
 *           description: Logged out successfully
 */
router.post("/logout", logout)

/**
 * @swagger
 *   /api/auth/check-auth:
 *     get:
 *       tags: [Auth]
 *       summary: Check authentication status
 *       responses:
 *         200:
 *           description: User found
 *         400:
 *           description: User not found
 */
router.get("/check-auth", verifyToken, checkAuth)

export default router