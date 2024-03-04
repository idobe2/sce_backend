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
            const item = await this.ItemModel.find({name: req.query.name});
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

async getById(req: Request, res: Response){
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

// const myfunc = () => {
//     const rs = new Promise((resolve, reject) => {
//         console.log("myfunc");
//         resolve("ok");
//     });
//     return rs;
// };

async put(req: Request, res: Response){
    console.log("Item put");
    res.status(400).send("Not implemented");
}

async remove(req: Request, res: Response){
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