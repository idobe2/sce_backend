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
*               - title
*               - category
*               - price
*               - message
*               - image
*               - owner
*           properties:
*               title:
*                   type: string
*                   description: The post title
*               category:
*                   type: string
*                   description: The post category
*               price:
*                   type: number
*                   description: The item price
*               message:
*                   type: string
*                   description: The post caption
*               image:
*                   type: string
*                   description: The post image URL
*               owner:
*                   type: string
*                   description: The post owner ID
*           example:
*               title: 'Lorem ipsum dolor sit amet'
*               category: 'Lorem ipsum'
*               price: '500'
*               message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tellus.'
*               owner: '663f5db16cf2615acbf64ca0'
*               image: 'http://localhost:3000/uploads/12345.jpg'
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
 * /post/find/{owner}:
 *  get:
 *    summary: Get all posts by user ID
 *    tags: [Post]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: owner
 *        required: true
 *        schema:
 *          type: string
 *          example: 5f8d04034b5f2c305c47b7b8
 *        description: Unique ID of the user to retrieve their posts
 *    responses:
 *      200:
 *          description: A list of posts owned by the user
 *          content:
 *              application/json:
 *                  schema:
 *                       type: array
 *                       items:
 *                           $ref: '#/components/schemas/Post'
 *      404:
 *          description: No posts found for the specified owner
 *      500:
 *          description: Server error
 */
router.get("/find/:owner", postController.getByOwnerId.bind(postController));

/**
 * @swagger
 * /post:
 *  post:
 *    summary: create a new post (access token required)
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