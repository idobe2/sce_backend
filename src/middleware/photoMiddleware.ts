import sharp from "sharp";
import path from "path";
import fs from "fs";

const destination = 'public/assets';

const photoMiddleware = async(req: any, res: any, next: any) => {
    try {
        await sharp(req.file.path)
        .resize(1500)
        .jpeg({ quality: 50 })
        .toFile(path.resolve(destination, req.file.filename + '_resized.jpg'))

        fs.unlinkSync(req.file.path)

        req.image = req.file.filename;
    } catch (error) {
        fs.unlinkSync(req.file.path)
        console.log(error);
    }

    next();
}

export default photoMiddleware;
