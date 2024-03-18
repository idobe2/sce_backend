"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(ItemModel) {
        this.ItemModel = ItemModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get");
            try {
                if (req.query.name) {
                    const item = yield this.ItemModel.find({ name: req.query.name });
                    res.status(200).send(item);
                }
                else {
                    const item = yield this.ItemModel.find();
                    res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            try {
                const item = yield this.ItemModel.findById(req.params.id);
                if (!item) {
                    return res.status(404).send("Student not found");
                }
                else {
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("student post");
            try {
                const item = yield this.ItemModel.create(req.body);
                res.status(201).send(item);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    // const myfunc = () => {
    //     const rs = new Promise((resolve, reject) => {
    //         console.log("myfunc");
    //         resolve("ok");
    //     });
    //     return rs;
    // };
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Item put");
            res.status(400).send("Not implemented");
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Item delete");
            try {
                yield this.ItemModel.findByIdAndDelete(req.params.id);
                return res.status(200).send();
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map