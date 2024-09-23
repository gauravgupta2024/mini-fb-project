import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

export function AvatarMulterConfig() {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = './public/avatars';

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
    fileFilter: (req, file, cb) => {
      // Accept images only
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        // console.log({ file });

        return cb(
          new Error('Invalid file type. Only images are allowed.'),
          false,
        );
      }
      cb(null, true);
    },
  };
}
