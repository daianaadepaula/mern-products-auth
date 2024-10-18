import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *       tags: [Products]
 *       summary: Create a new product
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image:
 *                   type: string
 *       responses:
 *         201:
 *           description: Product created successfully
 *         400:
 *           description: Please provide all fields
 *         500:
 *           description: Internal server error
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/products:
 *     get:
 *       tags: [Products]
 *       summary: Retrieve all products
 *       responses:
 *         200:
 *           description: Products retrieved successfully
 *         500:
 *           description: Internal server error
 */
router.get("/", getProducts);

/**
 * @swagger
 *   /api/products/{id}:
 *     put:
 *       tags: [Products]
 *       summary: Update a product
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID of the product to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       responses:
 *         200:
 *           description: Product updated successfully
 *         404:
 *           description: Invalid Product ID
 *         500:
 *           description: Internal server error
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 *   /api/products/{id}:
 *     delete:
 *       tags: [Products]
 *       summary: Delete a product
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID of the product to delete
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Product deleted successfully
 *         404:
 *           description: Invalid Product ID
 *         500:
 *           description: Internal server error
 */
router.delete("/:id", deleteProduct);

export default router;