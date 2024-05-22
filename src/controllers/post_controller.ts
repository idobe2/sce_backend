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

  async edit(req: Request, res: Response) {
    console.log("post: ", req.params);
    try {
        let item = await Post.findById({'id': req.params._id});
        if (!item) {
            return res.status(404).send("Post not found");
        }
        item.title = req.body.name;
        item.category = req.body.age;
        item.price = req.body.price;
        item.message = req.body.message;
        item.image = req.body.image;
        await item.save();
        return res.status(200).send(item);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}
}
export default new postController();
