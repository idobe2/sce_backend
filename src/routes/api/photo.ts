import express, { Request, Response } from "express";
const router = express.Router();
import multer from "multer";
import photoMiddleware from "../../middleware/photoMiddleware";

var upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }
})

router.post('/', [upload.single('image'), photoMiddleware], (req: Request, res: Response & { image?: string }) => {
    const image = res.image;
    if (image) {
        res.status(201).send("Successfully uploaded");
    }
    else {
        res.status(500).send("Server error");
    }

})

export = router;