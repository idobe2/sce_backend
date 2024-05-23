import express from "express";
import authController from "../controllers/auth_controller";
import authMiddleware from "../common/auth_middleware";
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Authentication API
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           required:
 *               - email
 *               - password
 *           properties:
 *               email:
 *                   type: string
 *                   description: The user email
 *               password:
 *                   type: string
 *                   description: The user password
 *           example:
 *               email: 'bob@gmail.com'
 *               password: '123456'
 *       Tokens:
 *           type: object
 *           required:
 *               - accessToken
 *               - refreshToken
 *           properties:
 *               accessToken:
 *                   type: string
 *                   description: The JWT access token
 *               refreshToken:
 *                   type: string
 *                   description: The JWT refresh token
 *           example:
 *               accessToken: '123cd123x1xx1'
 *               refreshToken: '134r2134cr1x3c'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *       summary: registers a new user
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *       responses:
 *           200:
 *               description: The new user
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/User'
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *       summary: login existing user by email and password
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *       responses:
 *           200:
 *               description: The acess & refresh tokens
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Tokens'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *       summary: logout a user (refresh token required)
 *       tags: [Auth]
 *       description: need to provide the refresh token in the auth header
 *       security:
 *           - bearerAuth: []
 *       responses:
 *           200:
 *               description: logout completed successfully
 */
router.get("/logout", authController.logout);

/**
 * @swagger
 * /auth/refresh:
 *  get:
 *      summary: get new access token and refresh token using the refresh token (refresh token required)
 *      tags: [Auth]
 *      description: need to provide the refresh token in the auth header
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: The new access token and refresh token
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tokens'
 */
router.get("/refresh", authController.refresh);

router.post("/google", authController.googleSignIn);

/**
 * @swagger
 * /auth/delete/{id}:
 *  delete:
 *    summary: delete user by user ID (access token required)
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 5f8d04034b5f2c305c47b7b8
 *        description: Unique ID of the user to delete
 *    responses:
 *      200:
 *          description: The user has been deleted successfully
 *          content:
 *              application/json:
 *                  schema:
 *                       type: array
 *                       items:
 *                           $ref: '#/components/schemas/User'
 */
router.delete("/delete/:id", authMiddleware, authController.deleteUser);

export default router;
