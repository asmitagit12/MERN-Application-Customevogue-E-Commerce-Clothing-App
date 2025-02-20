import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Stack,
  Breadcrumbs,
  Link,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleProduct } from '../../../services/admin/productServices';
import { addProduct } from '../../../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const baseUrl = import.meta.env.VITE_BASEURL;

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await getSingleProduct(productId || '');
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); // Set default image
      } catch (error: any) {
        console.error('Failed to fetch product:', error.message);
      }
    };
    fetchSingleProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    dispatch(addProduct({
      id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      productId: product._id,
      image: selectedImage,
      description: product.description,
      images: product.images
    }));

    toast.success(`Product added to cart successfully!`);
    navigate('/cart')
  };

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 6, lg: 20,sm:4 }} py={4}>
      <Grid container spacing={4}>
        {/* Images Section */}
        <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={2}>
            {/* Thumbnail Images */}
            <Grid item xs={3} sm={3} lg={2} md={2.5}>
              <Stack spacing={1}>
                {product.images.map((image: string, index: number) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      width: 60,
                      padding: 1,
                      border: selectedImage === image ? '2px solid blue' : '2px solid transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={`${baseUrl}api/uploads/${image}`} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                  </Paper>
                ))}
              </Stack>
            </Grid>

            {/* Main Image */}
            <Grid item xs={9} sm={9} lg={10} md={9}>
              <Box
                component='img'
                src={`${baseUrl}api/uploads/${selectedImage}`}
                alt='Selected Product'
                sx={{ width: '100%', height: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Product Info Section */}
        <Grid item xs={12} md={6} sm={5} lg={6}>
          <Stack spacing={2}>
            {/* Breadcrumbs */}
            <Breadcrumbs maxItems={5} aria-label='breadcrumb' sx={{ fontSize: 13 }}>
              <Link color='inherit' underline='none' href={'/'}>Home</Link>
              <Link color='inherit' underline='none' href={'/collection'}>{product?.category?.name}</Link>
              <Link color='inherit' underline='none' href={'/collection'}>{product?.subCategory?.name}</Link>
              <Typography sx={{ color: 'text.primary', fontSize: 13 }}>{product.name}</Typography>
            </Breadcrumbs>
            <Typography variant='h5'>{product.name}</Typography>
            <Typography sx={{ fontSize: 29 }} color='green'>₹{product.price}</Typography>
            <Typography variant='body1'>{product.description}</Typography>

            {/* Size Selection */}
            <Stack spacing={1} pt={2} alignItems='flex-start'>
              <Typography sx={{ color: 'gray', fontWeight: 550 }}>Select Size</Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap'>
                {product.sizes.map((size:any) => (
                  <Button
                    key={size.size}
                    variant='outlined'
                    sx={{
                      p: 0.4,
                      borderRadius: 0,
                      backgroundColor: selectedSize === size.size ? 'blue' : 'white',
                      color: selectedSize === size.size ? 'white' : 'black',
                    }}
                    onClick={() => setSelectedSize(size.size)}
                  >
                    {size.size}
                  </Button>
                ))}
              </Stack>
            </Stack>

            {/* Add to Cart Button */}
            <Stack direction='row' spacing={1} pt={2}>
              <Button
                variant='contained'
                onClick={handleAddToCart}
                sx={{
                  width: '100%',
                  background: 'linear-gradient(to right, #00c6fb, #005bea)',
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(to right, #00c6fb, #005bea)',
                  },
                }}
              >
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
