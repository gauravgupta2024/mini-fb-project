import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { Request } from 'express';

export function PostMulterConfig() {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = './public/posts';
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
          null,
          file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
        );
      },
    }),
    // fileFilter: (req, file, cb) => {
    //   if (!file.mimetype.match(/\/(jpg|jpeg|png|mp4|mp3)$/)) {
    //     return cb(
    //       new Error(
    //         'Invalid file type. Only images (jpg, jpeg, png, gif) and videos (mp4, mp3) are allowed.',
    //       ),
    //       false,
    //     );
    //   }
    //   cb(null, true);
    // },
  };
}
