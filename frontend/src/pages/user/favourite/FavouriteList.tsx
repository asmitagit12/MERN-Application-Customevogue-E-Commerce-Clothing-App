// import React from 'react'
// import {
//   Box,
//   Paper,
//   Typography,
//   Divider,
//   IconButton,
//   Stack
// } from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete'
// import { useNavigate } from 'react-router-dom'

// const FavouriteList: React.FC = () => {
//   const navigate = useNavigate()
//   const wishlistItems = [
//     {
//       id: 1,
//       image:
//         'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
//       name: 'TRAHIMAM Women Kurti Pant Set',
//       rating: 4,
//       reviews: '41,947',
//       price: 299,
//       originalPrice: 2999,
//       discount: 90
//     },
//     {
//       id: 2,
//       image:
//         'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
//       name: 'GOOD TO GREAT CREATION sweet 3D Satyam Kraft Panda Mug',
//       rating: 4,
//       reviews: '16',
//       price: 544,
//       originalPrice: 1499,
//       discount: 63
//     },
//     {
//       id: 3,
//       image:
//         'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
//       name: 'RIGO Women Shrug',
//       rating: 3.8,
//       reviews: '223',
//       price: 'Not Available',
//       unavailable: true
//     },
//     {
//       id: 4,
//       image:
//         'https://www.octaveclothing.com/cdn/shop/files/0C8A6062.jpg?v=1727972628&width=120', // Replace with actual URL
//       name: 'GOOD TO GREAT CREATION sweet 3D Satyam Kraft Panda Mug',
//       rating: 4,
//       reviews: '16',
//       price: 544,
//       originalPrice: 1499,
//       discount: 63
//     }
//   ]

//   return (
//     <Box sx={{ flex: 1 }}>
//       <Typography variant='h6' gutterBottom>
//         My Wishlist ({wishlistItems.length})
//       </Typography>
//       <Paper sx={{ p: 2, mb: 2 }}>
//         {wishlistItems.map((item, index) => (
//           <React.Fragment key={item.id}>
//             <Box
//               onClick={() => {
//                 navigate(`/product-details/${item.id}`)
//               }}
//               sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, mt: 1 }}
//             >
//               <Box
//                 sx={{
//                   width: 90,
//                   height: 90,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   style={{
//                     maxWidth: '100%',
//                     maxHeight: '100%',
//                     objectFit: 'contain'
//                   }}
//                 />
//               </Box>
//               <Stack spacing={0} sx={{ ml: 2, flex: 1 }}>
//                 <Typography variant='subtitle1' fontWeight='bold'>
//                   {item.name}
//                 </Typography>
//                 <Typography variant='body2' color='text.secondary'>
//                   {item.rating}★ ({item.reviews})
//                 </Typography>
//                 {item.unavailable && (
//                   <Typography
//                     component='span'
//                     sx={{ fontSize: 13, color: 'brown', textAlign: 'left' }}
//                   >
//                     Product currently unavailable
//                   </Typography>
//                 )}
//                 <Stack
//                   direction='row'
//                   spacing={1}
//                   sx={{ display: 'flex', alignItems: 'center' }}
//                 >
//                   <Typography>Price :</Typography>
//                   <Typography
//                     sx={{ fontSize: item.unavailable ? 16 : 19 }}
//                     color={item.unavailable ? 'error' : 'primary'}
//                   >
//                     {item.unavailable ? 'Not unavailable' : `₹${item.price}`}
//                   </Typography>
//                   {!item.unavailable && (
//                     <Typography
//                       variant='body2'
//                       color='text.secondary'
//                       sx={{ textDecoration: 'line-through' }}
//                     >
//                       ₹{item.originalPrice}
//                     </Typography>
//                   )}
//                   {!item.unavailable && (
//                     <Typography variant='body2' color='green'>
//                       {item.discount}% off
//                     </Typography>
//                   )}
//                 </Stack>
//               </Stack>
//               <IconButton>
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//             {index < wishlistItems.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </Paper>
//     </Box>
//   )
// }

// export default FavouriteList



import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Stack,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../../../redux/slices/wishlistSlice'
import wish from '../../../assets/empty-wish.jpg'
import toast from 'react-hot-toast'

// Define the interface for WishlistItem
interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: string;
  inStock: boolean;
  images: string[];
  categoryName: string;
  subCategoryName: string;
  description: string;
}

const baseUrl = import.meta.env.VITE_BASEURL;
const FavouriteList: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Fetch wishlist items from Redux store
  const wishlistItems = useSelector((state: any) => state.wishlist.items)
console.log('wishlistItems',wishlistItems)
  const isEmpty = wishlistItems?.length === 0

  // Remove item from the wishlist
  const handleRemoveItem = (id: string) => {
    dispatch(removeWishlistItem({ id }))  // Dispatch remove action to remove item from wishlist
    toast.success('Product removed from wishlist')
  }

  return (
    <Box sx={{ flex: 1 }}>
      {
        isEmpty ? (
          <Box
            sx={{
              width: '95%',
              // maxWidth: 800,
              backgroundColor: 'white',
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              m: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                py: 4
              }}
            >
              <img
                src={wish}
                alt='Empty Cart'
                style={{ width: 150, height: 150 }}
              />
              <Typography
                sx={{
                  mt: 2,
                  fontSize: 20,
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontWeight: 550
                }}
              >
                Your wishlist is empty
              </Typography>
              <Typography variant='body1' color='textSecondary' sx={{ mt: 1 }}>
                Looks like you haven't added anything to your wishlist yet!
              </Typography>
              <Button
                variant='contained'
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px', // Fully rounded button
                  background: 'linear-gradient(to right, #4facfe, #00f2fe)', // Linear gradient
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none', // Prevents uppercase text
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #00c6fb, #005bea)', // Hover effect gradient
                    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
                  }
                }}
                onClick={() => navigate('/')} // Change to your desired path
              >
                Explore Products
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              My Wishlist ({wishlistItems?.length})
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              {wishlistItems?.map((item: WishlistItem) => (
                <React.Fragment key={item._id}>
                  <Box
                    onClick={() => {
                      navigate(`/product-details/${item._id}`)  // Use _id for navigation
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
                        src={`${baseUrl}/uploads/${item?.images[0]}`}  // Use images[0] for product image
                        // src={item.images[0]}  // Use images[0] for product image
                        alt={item.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                    <Stack spacing={0} sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        {item.rating}★ ({item.reviews})
                      </Typography> */}
                      {item.inStock === false && (
                        <Typography
                          component="span"
                          sx={{ fontSize: 13, color: 'brown', textAlign: 'left' }}
                        >
                          Product currently unavailable
                        </Typography>
                      )}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Typography>Price :</Typography>
                        <Typography
                          sx={{ fontSize: item.inStock === false ? 16 : 19 }}
                          color={item.inStock === false ? 'error' : 'primary'}
                        >
                          {item.inStock === false ? 'Not Available' : `₹${item.price}`}
                        </Typography>

                        {/* {item.inStock && (
                          <>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: 'line-through' }}
                            >
                              ₹{item.originalPrice}
                            </Typography>
                            <Typography variant="body2" color="green">
                              {item.discount}% off
                            </Typography>
                          </>
                        )} */}
                      </Stack>
                      <Typography variant='subtitle2' sx={{ color: 'gray' }}>{item.description}</Typography>
                    </Stack>
                    <IconButton onClick={(e: React.MouseEvent) => {
                      e.stopPropagation(); // Prevent the click from bubbling up to Box's onClick
                      handleRemoveItem(item._id); // Call the function to remove the item from the wishlist
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  {wishlistItems.length > 1 && <Divider />}
                </React.Fragment>
              ))}
            </Paper>
          </>
        )
      }
    </Box>
  )
}

export default FavouriteList
