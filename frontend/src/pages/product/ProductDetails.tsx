import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Stack,
  IconButton,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Sample data for images and product details
  const product = {
    name: 'Women Cotton Rayon Kurti Pant Set',
    price: 299,
    originalPrice: 2999,
    discount: 90,
    rating: 4.2,
    ratingsCount: 41947,
    reviewsCount: 41947,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        color: 'Pink',
        images: [
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/e/s/h/m-tr-bandhani-trahimam-original-imah7gga49phaggh.jpeg?q=70&crop=false',
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/x/m/s/m-tr-bandhani-trahimam-original-imah7gga9zq4yuhk.jpeg?q=70&crop=false',
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/j/s/e/m-tr-bandhani-trahimam-original-imah7ggaqmbnpgxw.jpeg?q=70&crop=false',
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/y/q/y/m-tr-bandhani-trahimam-original-imah7ggapnqeagfd.jpeg?q=70&crop=false'
        ]
      },
      {
        color: 'Orange',
        images: [
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/r/t/n/xl-tr-bandhani-trahimam-original-imah7ggax2qybhss.jpeg?q=70&crop=false',
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/y/o/y/xl-tr-bandhani-trahimam-original-imah7ggacnhhhp7j.jpeg?q=70&crop=false',
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/w/i/h/xl-tr-bandhani-trahimam-original-imah7ggapt4cwjyu.jpeg?q=70&crop=false',
          'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/u/q/7/xl-tr-bandhani-trahimam-original-imah7ggaszzgzphz.jpeg?q=70&crop=false'
        ]
      }
    ]
  }

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]) // Default color set to the first one
  const [selectedImage, setSelectedImage] = useState(
    product.colors[0].images[0]
  ) // Default image set to the first image of the default color

  return (
    <Box padding={2}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Grid container spacing={2} width={'100%'}>
            {/* Left Section: Thumbnails */}
            <Grid item xs={1.9}>
              <Stack spacing={0.5}>
                {selectedColor.images.map((image, index) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      width: 60,
                      padding: 1,
                      border:
                        selectedImage === image
                          ? '2px solid blue'
                          : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Paper>
                ))}
              </Stack>
            </Grid>

            {/* Middle Section: Main Image */}
            <Grid item xs={10}>
              <Box
                component='img'
                src={selectedImage}
                alt='Selected Product'
                sx={{
                  width: '100%',
                  height: 'auto',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />
            </Grid>
            <Grid item xs={12} rowGap={1}>
              <Stack direction='row' spacing={1}>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ width: '50%' }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{ width: '50%' }}
                >
                  Buy Now
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section: Product Details */}
        <Grid item xs={7}>
          <Stack spacing={0.5}>
            <Breadcrumbs
              maxItems={5}
              aria-label='breadcrumb'
              sx={{ fontSize: 13 }}
            >
              <Link color='inherit' underline='none' href={'/'}>
                Home
              </Link>
              <Link color='inherit' underline='none' href={'/'}>
                Catalog
              </Link>
              <Link color='inherit' underline='none' href={'/'}>
                Accessories
              </Link>
              <Link color='inherit' underline='none' href={'/'}>
                New Collection
              </Link>
              <Typography sx={{ color: 'text.primary', fontSize: 13 }}>
                Belts
              </Typography>
            </Breadcrumbs>
            <Typography variant='h5'>{product.name}</Typography>
            <Typography sx={{ fontSize: 15, color: 'green', fontWeight: 550 }}>
              Special Price
            </Typography>

            <Stack
              direction={'row'}
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Typography variant='h6' color='green'>
                ₹{product.price}{' '}
                <Typography component='span' color='textSecondary'>
                  ({product.discount}% off)
                </Typography>
              </Typography>
              <Typography
                color='textSecondary'
                style={{ textDecoration: 'line-through' }}
              >
                ₹{product.originalPrice}
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Chip
                label={`${product.rating} ★`}
                color='success'
                size='small'
                style={{ marginRight: 5 }}
              />
              <Typography
                variant='subtitle2'
                color='textSecondary'
                sx={{ fontWeight: 550 }}
              >
                | {product.ratingsCount} ratings and {product.reviewsCount}{' '}
                reviews
              </Typography>
            </Stack>

            <Stack direction='row' spacing={2} pt={2}>
              <Typography sx={{ color: 'gray', fontWeight: 550 }}>
                Size{' '}
              </Typography>
              {product.sizes.map(size => (
                <Button
                  key={size}
                  variant='outlined'
                  sx={{
                    p: 0.4,
                    m: 0.8,
                    backgroundColor:
                      selectedSize === size ? '#00c6fb' : 'transparent', // Set background color for selected size
                    color: selectedSize === size ? 'white' : 'inherit', // Set text color for selected size
                    borderColor: selectedSize === size ? '#4facfe' : 'gray', // Set border color for selected size
                    '&:hover': {
                      backgroundColor:
                        selectedSize === size ? '#4facfe' : 'transparent' // Darken hover color for selected size
                    }
                  }}
                  onClick={() => setSelectedSize(size)} // Set selected size on click
                >
                  {size}
                </Button>
              ))}
            </Stack>

            {/* Color Selection */}
            <Stack direction={'row'} spacing={2} pt={3}>
              <Typography sx={{ color: 'gray', fontWeight: 550 }}>
                Color{' '}
              </Typography>
              {product.colors.map((colorOption, index) => (
                <Box
                  component={'img'}
                  src={colorOption.images[0]}
                  alt={colorOption.color}
                  key={index}
                  sx={{
                    p: 0.4,
                    m: 0.8,
                    height: 70,
                    width: 'auto',
                    border:
                      selectedColor.color === colorOption.color
                        ? `2px solid ${colorOption.color.toLowerCase()}` // Apply border with selected color
                        : '2px solid transparent', // Default border if not selected
                    cursor: 'pointer', // Make the image clickable
                    transition: 'border-color 0.3s' // Smooth transition for border color change
                  }}
                  onClick={() => {
                    setSelectedColor(colorOption) // Set the selected color
                    setSelectedImage(colorOption.images[0]) // Set the first image of the selected color
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetails
