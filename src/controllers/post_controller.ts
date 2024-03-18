import baseController from "./base_controller";
import Post, { IPost } from "../models/post_model";
import { Request, Response } from "express";

class postController extends baseController<IPost> {
  constructor() {
    super(Post);
  }
  async post(req: Request, res: Response) {
    req.body.owner = req.body.user._id;
    super.post(req, res);
  }
}
export default new postController();
