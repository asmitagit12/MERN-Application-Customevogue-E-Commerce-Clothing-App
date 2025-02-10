import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Stack,
  Breadcrumbs,
  Link
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
      size:selectedSize,
      quantity: 1,
      productId: product._id,
      image:selectedImage,
      description:product.description,
     
    }));

    toast.success(`Product added to cart successfully!`);
    navigate('/cart')
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box padding={2} sx={{ pl: 20, pr: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container spacing={2} width={'100%'}>
            <Grid item xs={2} mr={0.5}>
              <Stack spacing={0.5}>
                {product.images.map((image: string, index: number) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      width: 60,
                      padding: 1,
                      border: selectedImage === image ? '2px solid blue' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={`${baseUrl}/uploads/${image}`} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                  </Paper>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={9.5}>
              <Box
                component='img'
                src={`${baseUrl}/uploads/${selectedImage}`}
                alt='Selected Product'
                sx={{ width: '100%', height: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={1}>
            <Breadcrumbs maxItems={5} aria-label='breadcrumb' sx={{ fontSize: 13 }}>
              <Link color='inherit' underline='none' href={'/'}>Home</Link>
              <Link color='inherit' underline='none' href={'/collection'}>{product.category.name}</Link>
              <Link color='inherit' underline='none' href={'/collection'}>{product.subCategory.name}</Link>
              <Typography sx={{ color: 'text.primary', fontSize: 13 }}>{product.name}</Typography>
            </Breadcrumbs>
            <Typography variant='h5'>{product.name}</Typography>
            <Typography sx={{ fontSize: 29 }} color='green'>₹{product.price}</Typography>
            <Typography variant='body1'>{product.description}</Typography>

            <Stack spacing={1} pt={2} alignItems={'flex-start'}>
              <Typography sx={{ color: 'gray', fontWeight: 550 }}>Select Size </Typography>
              <Stack direction={'row'} spacing={1}>
                {product.sizes.map((size: any) => (
                  <Button
                    key={size.size}
                    variant='outlined'
                    sx={{
                      p: 0.4,
                      borderRadius: 0,
                      backgroundColor: selectedSize === size.size ? 'blue' : 'white',
                      color: selectedSize === size.size ? 'white' : 'black'
                    }}
                    onClick={() => setSelectedSize(size.size)}
                  >
                    {size.size}
                  </Button>
                ))}
              </Stack>
            </Stack>
            <Stack direction='row' spacing={1} pt={2}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddToCart}
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
