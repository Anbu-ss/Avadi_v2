/**
 * Utility functions for validating and cropping profile images into high quality circular avatars.
 */

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

export interface ProcessImageOptions {
  targetSize?: number; // Output dimensions (e.g., 500x500 for crisp quality)
  quality?: number; // Compression quality (0 to 1)
}

/**
 * Validates if the uploaded file is a supported image format (JPG, JPEG, PNG, WEBP).
 */
export const validateImageFormat = (file: File): { isValid: boolean; error?: string } => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type.toLowerCase();

  const isValidType = SUPPORTED_IMAGE_TYPES.includes(mimeType) || 
    (extension && SUPPORTED_EXTENSIONS.includes(extension));

  if (!isValidType) {
    return {
      isValid: false,
      error: 'Invalid file format. Please select an image in JPG, JPEG, PNG, or WEBP format.',
    };
  }

  // 10MB size cap safety check
  if (file.size > 10 * 1024 * 1024) {
    return {
      isValid: false,
      error: 'File size too large. Please select an image under 10MB.',
    };
  }

  return { isValid: true };
};

/**
 * Reads, center-crops to 1:1 square, and generates a high-quality base64 Data URL.
 */
export const processAndCropProfileImage = (
  file: File,
  options: ProcessImageOptions = {}
): Promise<string> => {
  const { targetSize = 500, quality = 0.92 } = options;

  return new Promise((resolve, reject) => {
    const validation = validateImageFormat(file);
    if (!validation.isValid) {
      reject(new Error(validation.error || 'Invalid image format'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Canvas context context creation failed'));
            return;
          }

          // Compute square center crop coordinates (1:1 aspect ratio)
          const minDimension = Math.min(img.width, img.height);
          const sourceX = (img.width - minDimension) / 2;
          const sourceY = (img.height - minDimension) / 2;

          // Configure high-quality smoothing algorithms
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw center-cropped square region onto output canvas
          ctx.drawImage(
            img,
            sourceX,
            sourceY,
            minDimension,
            minDimension,
            0,
            0,
            targetSize,
            targetSize
          );

          // Standardize to high-quality WebP or JPEG base64 Data URL
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/webp';
          const dataUrl = canvas.toDataURL(outputType, quality);

          resolve(dataUrl);
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Failed to process image canvas'));
        }
      };

      img.onerror = () => reject(new Error('Failed to decode selected image file.'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file from disk.'));
    reader.readAsDataURL(file);
  });
};
