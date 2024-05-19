import express from 'express';
import sharp from 'sharp';
import multer from 'multer';
import { Request, Response } from 'express';
const router = express.Router();


const storagePhotos = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log(file);
        let filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'profile-' + new Date().toISOString() + '.' + filetype);
    }
});

const uploadPhoto = multer({ storage: storagePhotos });

router.post('/UploadPhoto', uploadPhoto.single('photo'), (req: Request, res: Response) => {
    const _uid = req.body.uid;
    const file = req.file;
    if (file) {
        sharp(file.path).resize(300, 300).toFile('./uploads/' + '300x300-' + file.filename, (err) => {
            if (err) {
                console.log('sharp>>>', err);
            } else {
                console.log('resize ok !');
            }
        });
        res.send('File uploaded and resized successfully');
    } else {
        throw new Error('Error uploading file');
    }
});

export default router;