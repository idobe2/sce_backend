import express from "express";
const router = express.Router();
import multer from "multer";

const base = `http://${process.env.DOMAIN_BASE}:${process.env.PORT}/`;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        // const ext = file.originalname.split('.')
        //     .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
        //     .slice(1)
        //     .join('.')
        // cb(null, Date.now() + "." + ext)
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

router.post('/file', upload.single("file"), function (req, res) {
    console.log("router.post(/file: " + base + req.file.path)
    res.status(200).send({ url: base + req.file.path })
});
export = router;

