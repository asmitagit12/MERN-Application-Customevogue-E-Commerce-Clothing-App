import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Stack
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'

const FavouriteList: React.FC = () => {
  const navigate = useNavigate()
  const wishlistItems = [
    {
      id: 1,
      image:
        'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
      name: 'TRAHIMAM Women Kurti Pant Set',
      rating: 4,
      reviews: '41,947',
      price: 299,
      originalPrice: 2999,
      discount: 90
    },
    {
      id: 2,
      image:
        'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
      name: 'GOOD TO GREAT CREATION sweet 3D Satyam Kraft Panda Mug',
      rating: 4,
      reviews: '16',
      price: 544,
      originalPrice: 1499,
      discount: 63
    },
    {
      id: 3,
      image:
        'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
      name: 'RIGO Women Shrug',
      rating: 3.8,
      reviews: '223',
      price: 'Not Available',
      unavailable: true
    },
    {
      id: 4,
      image:
        'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
      name: 'GOOD TO GREAT CREATION sweet 3D Satyam Kraft Panda Mug',
      rating: 4,
      reviews: '16',
      price: 544,
      originalPrice: 1499,
      discount: 63
    }
  ]

  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant='h6' gutterBottom>
        My Wishlist ({wishlistItems.length})
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        {wishlistItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Box
              onClick={() => {
                navigate(`/product-details/${item.id}`)
              }}
              sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, mt: 1 }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Stack spacing={0} sx={{ ml: 2, flex: 1 }}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {item.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.rating}★ ({item.reviews})
                </Typography>
                {item.unavailable && (
                  <Typography
                    component='span'
                    sx={{ fontSize: 13, color: 'brown', textAlign: 'left' }}
                  >
                    Product currently unavailable
                  </Typography>
                )}
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography>Price :</Typography>
                  <Typography
                    sx={{ fontSize: item.unavailable ? 16 : 19 }}
                    color={item.unavailable ? 'error' : 'primary'}
                  >
                    {item.unavailable ? 'Not unavailable' : `₹${item.price}`}
                  </Typography>
                  {!item.unavailable && (
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ₹{item.originalPrice}
                    </Typography>
                  )}
                  {!item.unavailable && (
                    <Typography variant='body2' color='green'>
                      {item.discount}% off
                    </Typography>
                  )}
                </Stack>
              </Stack>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
            {index < wishlistItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>
    </Box>
  )
}

export default FavouriteList
