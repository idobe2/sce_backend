"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
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
*               - message
*               - owner
*           properties:
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
*               title: 'Lorem ipsum dolor sit amet'
*               message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tellus.'
*               owner: '663f5db16cf2615acbf64ca0'
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
router.get("/", post_controller_1.default.get.bind(post_controller_1.default));
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
router.get("/:id", post_controller_1.default.getById.bind(post_controller_1.default));
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
router.get("/find/:owner", post_controller_1.default.getByOwnerId.bind(post_controller_1.default));
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
router.post("/", auth_middleware_1.default, post_controller_1.default.post.bind(post_controller_1.default));
router.put("/:id", post_controller_1.default.put.bind(post_controller_1.default));
router.delete("/:id", post_controller_1.default.remove.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map