import { Router, Request, Response } from 'express'
import { createMediaUploader } from '../middleware/uploadMiddleWare'
import Product from '../models/Product'
import path from 'path'
import { unlink } from 'fs'
import { errorResponse, successResponse } from '../helper/responseHelpers'

// Define the options for the media uploader
const mediaUploader = createMediaUploader({
  allowedTypes: /image\/(jpeg|png|jpg)/, // Accept only image files
  maxFiles: 5, // Maximum 5 files
  fieldName: 'images', // Field name used in the form for images
  fileSizeLimit: 10 * 1024 * 1024 // 10 MB limit per file
})

const mediaRouter = Router()

// Route for images
mediaRouter.post(
  '/add-images/:productId',
  mediaUploader,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params

      // Check if files were uploaded
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ error: 'No images were uploaded' })
        return // Ensure we return early here to avoid executing the rest of the code
      }

     

      // Generate image names based on product ID
      const imageNames = (req.files as Express.Multer.File[]).map(
        file => file.filename
      ) // Store only the filename, not the full path

      // Find the product and update its images
      const product = await Product.findByIdAndUpdate(
        productId,
        { $push: { images: { $each: imageNames } } },
        { new: true }
      )

      if (!product) {
        res.status(404).json({ error: 'Product not found' })
        return // Early return after sending the response
      }

      res.status(200).json({ message: 'Images added successfully', product })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
)

// Route for deleting an image using POST request
mediaRouter.post('/delete-image/:productId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { imageName } = req.body; // Expecting imageName from the body for deletion

    // Ensure imageName is provided
    if (!imageName) {
      res.status(400).json({ error: 'Image name is required' });
      return;
    }

    // Find the product and remove the image from the images array
    const product = await Product.findByIdAndUpdate(
      productId,
      { $pull: { images: imageName } }, // Pull the image name out of the images array
      { new: true }
    );

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Optionally, delete the image file from the server (if you want to physically delete the image)
    const imagePath = path.join(__dirname, '../uploads', imageName); // Update path according to your file storage structure

    unlink(imagePath, (err) => {
      if (err) {
        // console.error('Error deleting the image file:', err);
        // Not throwing error here, just logging
      }
    });

    res.status(200).json({ message: 'Image deleted successfully', product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default mediaRouter
