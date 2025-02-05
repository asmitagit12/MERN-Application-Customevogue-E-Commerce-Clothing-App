import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  IconButton
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import toast, { Toaster } from 'react-hot-toast'
import { deleteImage } from '../../services/admin/imageUploadService'

const baseUrl = import.meta.env.VITE_BASEURL

interface Image {
  name: string
  src: string
  progress: number
  completed: boolean
  file: File | null
}

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void
  initialImages?: string[]
  productId: string // Add productId for API calls
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  initialImages = [],
  productId
}) => {
  const [initialImageState, setInitialImageState] = useState<Image[]>([])
  const [selectedImages, setSelectedImages] = useState<Image[]>([]) // Track only newly selected files
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize the images when editing a product
  useEffect(() => {
    if (initialImages.length > 0) {
      const initialImageObjects = initialImages.map(imageSrc => ({
        name: imageSrc,
        src: `${baseUrl}/uploads/${imageSrc}`,
        progress: 100,
        completed: true,
        file: null
      }))
      setInitialImageState(initialImageObjects)
    }
  }, [initialImages])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    const selectedImagesArray = Array.from(selectedFiles).map(file => ({
      name: file.name,
      src: URL.createObjectURL(file),
      progress: 0,
      completed: false,
      file: file
    }))

    if (selectedImagesArray.length > 5) {
      toast.error('You can only upload up to 5 images.')
      return
    }

    // Set only selected files in the state
    setSelectedImages(selectedImagesArray)
    triggerOnImagesChange(selectedImagesArray)
    simulateUploadProgress(selectedImagesArray)
  }

  const triggerOnImagesChange = (updatedImages: Image[]) => {
    const filteredFiles = updatedImages
      .map(img => img.file)
      .filter(file => file !== null) as File[]
    onImagesChange(filteredFiles) // Notify parent with selected files
  }

  const simulateUploadProgress = (updatedImages: Image[]) => {
    updatedImages.forEach((_, index) => {
      let progressInterval = 0
      const interval = setInterval(() => {
        setSelectedImages(prevImages => {
          const updatedState = [...prevImages]
          updatedState[index] = {
            ...updatedState[index],
            progress: progressInterval
          }
          return updatedState
        })

        if (progressInterval < 100) {
          progressInterval += 10
        } else {
          clearInterval(interval)
          handleComplete(index) // Mark upload as completed
        }
      }, 500)
    })
  }

  const handleComplete = (index: number) => {
    setSelectedImages(prevImages =>
      prevImages.map((img, i) =>
        i === index ? { ...img, completed: true, progress: 100 } : img
      )
    )
  }

  const handleRemoveInitialImage = async (index: number) => {
    const imageToDelete = initialImageState[index]
    try {
      // Call the deleteImage API with the image name and product ID
      await deleteImage({ imageName: imageToDelete.name }, productId)
      toast.success('Image deleted successfully.')

      // Update the state to remove the image
      setInitialImageState(prevImages =>
        prevImages.filter((_, i) => i !== index)
      )
    } catch (error: any) {
      toast.error('Failed to delete the image. Please try again.')
      console.error(error.message)
    }
  }

  const handleRemoveSelectedImage = (index: number) => {
    setSelectedImages(prevImages => {
      const updatedState = prevImages.filter((_, i) => i !== index)
      triggerOnImagesChange(updatedState)
      return updatedState
    })
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Toaster />
      {/* Drop Zone */}
      <Grid item xs={12}>
        <Typography sx={{ fontSize: 15, mb: 1 }}>Product Gallery</Typography>
        <Box
          sx={{
            border: '2px dashed gray',
            borderRadius: '8px',
            height: '150px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'gray',
            cursor: 'pointer'
          }}
        >
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='file-upload'
            type='file'
            multiple
            onChange={handleFileChange}
            ref={inputRef}
          />
          <label htmlFor='file-upload'>
            <Typography variant='body2'>
              Drop your images here, or browse
              <br />
              JPEG, PNG are allowed
            </Typography>
          </label>
        </Box>
      </Grid>

      {/* Initial Images List */}
      <Grid item xs={12}>
        {initialImageState.map((image, index) => (
          <Grid
            item
            xs={12}
            key={`initial-${index}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f9f9f9',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '8px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component='img'
                src={image.src}
                alt={image.name}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <Typography>{image.name}</Typography>
            </Box>
            <IconButton onClick={() => handleRemoveInitialImage(index)}>
              <RemoveCircleOutlineIcon color='error' />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      {/* Selected Images List */}
      <Grid item xs={12}>
        {selectedImages.map((image, index) => (
          <Grid
            item
            xs={12}
            key={`selected-${index}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f9f9f9',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '8px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component='img'
                src={image.src}
                alt={image.name}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <Typography>{image.name}</Typography>
            </Box>
            <Box sx={{ flex: 1, mx: 2 }}>
              {!image.completed && (
                <LinearProgress
                  variant='determinate'
                  value={image.progress}
                  sx={{
                    height: 8,
                    borderRadius: '4px'
                  }}
                />
              )}
            </Box>
            {image.completed && (
              <IconButton onClick={() => handleRemoveSelectedImage(index)}>
                <RemoveCircleOutlineIcon color='error' />
              </IconButton>
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default ImageUpload
