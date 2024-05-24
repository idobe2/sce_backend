import { Request, Response } from "express";
import mongoose from "mongoose";

class BaseController<ModelType> {
    ItemModel: mongoose.Model<ModelType>;
    constructor(ItemModel: mongoose.Model<ModelType>) {
        this.ItemModel = ItemModel;
    }

    async get(req: Request, res: Response) {
        console.log("get");
        try {
            if (req.query.name) {
                const item = await this.ItemModel.find({ name: req.query.name });
                res.status(200).send(item);
            } else {
                const item = await this.ItemModel.find();
                res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async getByCategory(req: Request, res: Response) {
        console.log("Getting items by category");
        const category = req.params.category;
        console.log("Category:", category);
        try {
            const items = await this.ItemModel.find({ category: category });
            console.log("Query result:", items);
            if (!items.length) {
                return res.status(404).send("No items found");
            } else {
                return res.status(200).send(items);
            }
        } catch (error) {
            console.log("Error during database query:", error);
            res.status(400).send(error.message);
        }
    }

    async getById(req: Request, res: Response) {
        console.log(req.params);
        try {
            const item = await this.ItemModel.findById(req.params.id);
            if (!item) {
                return res.status(404).send("Student not found");
            } else {
                return res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async getByAccessToken(req: Request, res: Response) {
        const user = req.body.user;
        try {
            const item = await this.ItemModel.findById(user);
            if (!item) {
                return res.status(404).send("Student not found");
            } else {
                return res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async getByOwnerId(req: Request, res: Response) {
        console.log("Getting items by owner ID");
        const ownerId = req.params.owner;
        console.log("Owner ID:", ownerId);  // Log the owner ID to check if it's correctly received
        try {
            const items = await this.ItemModel.find({ owner: ownerId });
            console.log("Query result:", items);  // Log the database query results
            if (!items.length) {
                return res.status(404).send("No items found for the specified owner");
            } else {
                return res.status(200).send(items);
            }
        } catch (error) {
            console.log("Error during database query:", error);
            res.status(400).send(error.message);
        }
    }

    async post(req: Request, res: Response) {
        console.log("student post");
        try {
            const item = await this.ItemModel.create(req.body);
            res.status(201).send(item);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async put(req: Request, res: Response) {
        console.log("Item put");
        console.log(req.params);
        try {
            const item = await this.ItemModel.findById(req.params.id);
            if (!item) {
                res.status(404).send("Item not found");
            } else {
                item.set(req.body);
                await item.save();
                res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async remove(req: Request, res: Response) {
        console.log("Item delete");
        try {
            await this.ItemModel.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
    }
}

export default BaseController;