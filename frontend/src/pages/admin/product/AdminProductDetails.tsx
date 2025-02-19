import  { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Chip
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProduct } from '../../../services/admin/productServices'
import { Paper } from '@mui/material'
import BreadcrumbsComponent from '../../../components/controls/BreadcrumbsComponent'

const baseUrl = import.meta.env.VITE_BASEURL

const AdminProductDetails = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState<any>(null) // To store product details
  const [selectedSize, setSelectedSize] = useState<string | null>(null) // To track selected size
  const [selectedImage, setSelectedImage] = useState<string>('') // To track selected image
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await getSingleProduct(productId || '')
        setProduct(response?.data) // Assuming the response is in `data`
        setSelectedImage(response?.data?.images[0] || '') // Set the first image as default
      } catch (error: any) {
        console.error('Failed to fetch product:', error.message)
      }
    }
    fetchSingleProduct()
  }, [productId])

  if (!product) return <Typography>Loading...</Typography>

  const links = [
    { label: 'Home', href: '/admin' },
    { label: `Products`, href: '/admin/products' },
    { label: `${product?.category?.name}` },
    { label: `${product?.subCategory?.name}` },
    { label: `${product?.name}` }
  ]
  return (
    <Box padding={1}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexWrap: {
            md: 'nowrap',
            sm: 'wrap-reverse',
            xs: 'wrap-reverse',
            lg: 'nowrap'
          }
        }}
      >
        <Grid item xs={12} md={6} lg={6} sm={12}>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: {
                xs: 'wrap-reverse',
                md: 'nowrap',
                sm: 'wrap-reverse',
                lg: 'nowrap'
              }
            }}
          >
            {/* Left Section: Thumbnails */}
            <Grid item xs={12} lg={1.8} md={1.9} sm={12}>
              <Stack spacing={0.5}>
                {product?.images?.map((image: string, index: number) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      width: 50,
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
                      src={`${baseUrl}/uploads/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Paper>
                ))}
              </Stack>
            </Grid>

            {/* Middle Section: Main Image */}
            <Grid item xs={12} lg={10} md={10} sm={12}>
              <Box
                component='img'
                src={`${baseUrl}/uploads/${selectedImage}`}
                alt='Selected Product'
                sx={{
                  width: '100%',
                  height: 'auto',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Right Section: Product Details */}
        <Grid item xs={12} md={6} lg={6} sm={12}>
          <Stack spacing={1}>
            <BreadcrumbsComponent links={links} size={13} />

            {/* Product Title */}
            <Typography variant='h5'>{product.name}</Typography>

            <Stack
              direction={'row'}
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Price and Discount */}
              <Typography
                sx={{ fontSize: 15, color: 'black', fontWeight: 550 }}
              >
                Price
              </Typography>
              <Typography variant='h6' color='green'>
                ₹{product.price}{' '}
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Price and Discount */}
              <Typography
                sx={{ fontSize: 15, color: 'black', fontWeight: 550 }}
              >
                Category :
              </Typography>
              <Typography sx={{ fontSize: 15 }} color='GrayText'>
                {product.category?.name}{' '}
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Price and Discount */}
              <Typography
                sx={{ fontSize: 15, color: 'black', fontWeight: 550 }}
              >
                Sub-Category :
              </Typography>
              <Typography sx={{ fontSize: 15 }} color='GrayText'>
                {product.subCategory?.name}{' '}
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Price and Discount */}
              <Typography
                sx={{ fontSize: 15, color: 'black', fontWeight: 550 }}
              >
                Total remaining stock :
              </Typography>
              <Typography sx={{ fontSize: 15 }} color='GrayText'>
                {product.stock}{' '}
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Price and Discount */}
              <Typography
                sx={{ fontSize: 15, color: 'black', fontWeight: 550 }}
              >
                Instock status :
              </Typography>

              <Chip
                label={`${product.inStock}`}
                variant='filled'
                size='small'
                sx={{ width: 90, bgcolor: '#90EE90', color: 'green' }}
              />
            </Stack>
            <Typography
              variant='subtitle2'
              color='textSecondary'
              sx={{ pt: 0.5, pb: 0.5 }}
            >
              {product?.description}
            </Typography>

            {/* Size Selection */}
            <Stack direction='row' spacing={2} pt={2} alignItems={'center'}>
              <Typography sx={{ color: 'gray', fontWeight: 550 }}>
                Size
              </Typography>
              {product.sizes.map((sizeObj: { size: string; stock: number }) => (
                <Button
                  key={sizeObj?.size} // Use _id or size to uniquely identify each button
                  variant='outlined'
                  sx={{
                    p: 0.4,
                    m: 0.8,
                    backgroundColor:
                      selectedSize === sizeObj.size ? '#00c6fb' : 'transparent', // Set background color for selected size
                    color: selectedSize === sizeObj.size ? 'white' : 'inherit', // Set text color for selected size
                    borderColor:
                      selectedSize === sizeObj.size ? '#4facfe' : 'gray', // Set border color for selected size
                    '&:hover': {
                      backgroundColor:
                        selectedSize === sizeObj.size
                          ? '#4facfe'
                          : 'transparent' // Darken hover color for selected size
                    }
                  }}
                  onClick={() => setSelectedSize(sizeObj.size)} // Set selected size on click
                >
                  {sizeObj.size} - {sizeObj.stock}
                </Button>
              ))}
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            spacing={1}
            mt={'25vh'}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              variant='contained'
              onClick={() => {
                navigate('/admin/products')
              }}
              sx={{
                width: '50%',
                background: 'linear-gradient(to right, #00c6fb, #005bea)',
                boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to right, #00c6fb, #005bea)',
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              Back
            </Button>
            <Button
              variant='contained'
              sx={{
                width: '50%',
                background: 'linear-gradient(to right, #00c6fb, #005bea)',
                boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to right, #00c6fb, #005bea)',
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
                }
              }}
              onClick={() => {
                navigate(`/admin/update-product/${product?._id}`)
              }}
            >
              Edit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminProductDetails
