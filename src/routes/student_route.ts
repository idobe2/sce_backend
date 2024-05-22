import express from "express";
const router = express.Router();
import studentController from "../controllers/student_controller";
import authMiddleware from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *  name: Student
 *  description: The Authentication API
 */

/**
* @swagger
* components:
*   schemas:
*       Student:
*           type: object
*           required:
*               - _id
*               - name
*               - age
*           properties:
*               _id:
*                   type: string
*                   description: The user id
*               name:
*                   type: string
*                   description: The user name
*               age:
*                   type: number
*                   description: The user age
*           example:
*               _id: '12345'
*               name: 'jhon'
*               age: 25
*               image: 'http://localhost:3000/uploads/12345.jpg'
* 
*/

/**
* @swagger
* /student:
*   get:
*       summary: get all students
*       tags: [Student]
*       security:
*          - bearerAuth: []
*       responses:
*           200:
*               description: list of all the students
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Student'
*/
router.get("/", authMiddleware, studentController.get.bind(studentController));

/**
 * @swagger
 * /student:
 *  post:
 *    summary: create a new student
 *    tags: [Student]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      201:
 *          description: Student created successfully
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 * */
router.post("/", authMiddleware, studentController.post.bind(studentController));

/**
 * @swagger
 * /student/get/{id}:
 *  get:
 *    summary: get student by id
 *    tags: [Student]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 12345
 *        description: Unique id of the student to retrieve
 *    responses:
 *      200:
 *          description: Student details
 *          content:
 *              application/json:  
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 * */
router.get("/get/:id", studentController.getById.bind(studentController));

/**
 * @swagger
 * /student/{accessToken}:
 *  get:
 *    summary: get student (access token required)
 *    tags: [Student]
 *    security:
 *      - bearerAuth: []
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *          description: Student details
 *          content:
 *              application/json:  
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 * */
router.get("/:accessToken", authMiddleware, studentController.getByAccessToken.bind(studentController));

/**
 * @swagger
 * /student/{id}:
 *  put:
 *    summary: Update student (access token required)
 *    tags: [Student]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      200:
 *          description: Student updated successfully
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 * */
router.put("/:id", authMiddleware, studentController.edit.bind(studentController));

router.delete("/:id", authMiddleware, studentController.remove.bind(studentController));

export default router;