import { uploadToCloudinary } from '../../config/cloudinary';

export class UploadService {
  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw Object.assign(new Error('No file provided'), { statusCode: 400 });
    }
    const result = await uploadToCloudinary(file.path, 'cse18_portal');
    return {
      url: result.secure_url,
      publicId: result.public_id,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }

  async getAll() {
    return { message: 'Upload service ready' };
  }
}

export const uploadService = new UploadService();
