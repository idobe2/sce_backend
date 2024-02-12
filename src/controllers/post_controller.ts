import baseController from "./base_controller";
import Post, { IPost } from "../models/post_model";

const postController = new baseController<IPost>(Post);

export default postController;