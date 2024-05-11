import express from "express";
const router = express.Router();
import postController from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: The Authentication API
 */

/**
* @swagger
* components:
*   schemas:
*       Post:
*           type: object
*           required:
*               _ _id
*               - title
*               - message
*               - owner
*           properties:
*               _id:
*                   type: string
*                   description: The user id
*               title:
*                   type: string
*                   description: The post title
*               message:
*                   type: string
*                   description: The post caption
*               owner:
*                   type: string
*                   description: The post owner ID
*           example:
*               _id: '663f54272a5449fe53ded321'
*               title: 'Lorem ipsum dolor sit amet'
*               message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tellus.'
*               owner: '663f541eeae7f9ec39f9b5fd'
*/

/**
* @swagger
* /post:
*   get:
*       summary: get all posts
*       tags: [Post]
*       security:
*          - bearerAuth: []
*       responses:
*           200:
*               description: list of all the posts
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Post'
*/
router.get("/", postController.get.bind(postController));

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    summary: get post by id
 *    tags: [Post]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 12345
 *        description: Unique id of the post to retrieve
 *    responses:
 *      200:
 *          description: Post details
 *          content:
 *              application/json:  
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 * */
router.get("/:id", postController.getById.bind(postController));

/**
 * @swagger
 * /post:
 *  post:
 *    summary: create a new post
 *    tags: [Post]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      201:
 *          description: Post created successfully
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 * */
router.post("/", authMiddleware, postController.post.bind(postController));

router.put("/:id", postController.put.bind(postController));

router.delete("/:id", postController.remove.bind(postController));

export default router;