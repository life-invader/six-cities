import mime from 'mime-types';
import { nanoid } from 'nanoid';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import type { MiddlewareInterface } from '../../types/middleware.interface';

export class UploadFileMiddleware implements MiddlewareInterface {
  uploadDirectory: string;
  fieldName: string;

  constructor(uploadDirectory: string, fieldName: string) {
    this.uploadDirectory = uploadDirectory;
    this.fieldName = fieldName;
  }

  execute(req: Request, res: Response, next: NextFunction) {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      },
    });

    const uploadMiddleware = multer({ storage: storage }).single(
      this.fieldName
    );
    uploadMiddleware(req, res, next);
  }
}
