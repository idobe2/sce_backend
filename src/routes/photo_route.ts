import express, { Request, Response } from "express";
const router = express.Router();
import multer from "multer";
import photoMiddleware from "../middleware/photoMiddleware";

var upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }
})

router.post('/photo', [upload.single('image')], (req, res) => {
    console.log("router.post(/photo: " + req.file.path)
    const image = res.image;
    if (image) {
        res.status(201).send("Successfully uploaded");
    }
    else {
        res.status(500).send("Server error");
    }

})

export default router;