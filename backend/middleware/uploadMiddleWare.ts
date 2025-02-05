import multer from 'multer';
import { Request } from 'express';

interface MediaUploaderOptions {
  allowedTypes: RegExp;
  maxFiles: number;
  fieldName: string;
  fileSizeLimit: number; // in bytes
}

export const createMediaUploader = (options: MediaUploaderOptions) => {
  // Using disk storage instead of memory storage for more efficient file handling
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      // Define the directory for file uploads
      cb(null, 'uploads/'); // This sets the uploads folder as the destination
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const { productId } = req.params;
      const fileExtension = file.originalname.split('.').pop(); // Get file extension
      const newFilename = `${productId}_${Date.now()}.${fileExtension}`; // Generate new filename with product ID and timestamp
      cb(null, newFilename); // Call the callback with the generated filename
    }
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (options.allowedTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${options.allowedTypes}`));
    }
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: options.fileSizeLimit, // Size in bytes
    },
  }).array(options.fieldName, options.maxFiles);

  return upload;
};
