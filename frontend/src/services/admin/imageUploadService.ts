import { apiRequest } from '../../http-common/apiRequest'

interface UploadResponse {
  message: string
  files: Array<{
    originalName: string
    mimeType: string
    size: number
    buffer?: string // Include `buffer` only if necessary
  }>
}

/**
 * Service to upload images.
 * @param images - Array of `File` objects to upload.
 * @returns Response data from the API.
 */
export const uploadImages = async (
  images: File[],
  productId: string
): Promise<UploadResponse> => {
  const formData = new FormData()

  images.forEach(image => {
    formData.append('images', image, image.name)
  })

  return apiRequest({
    route: `/add-images/${productId}`, // Include productId in the URL
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteImage = async (
  data: { imageName: string },
  productId: string
): Promise<UploadResponse> => {
  return apiRequest({
    route: `/delete-image/${productId}`, // Include productId in the URL
    method: 'POST',
    data
  })
}
