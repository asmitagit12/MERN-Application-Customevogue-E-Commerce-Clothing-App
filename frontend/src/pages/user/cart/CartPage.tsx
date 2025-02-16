// import React from "react";
// import {
//     Box,
//     Typography,
//     Button,
//     Card,
//     CardMedia,
//     CardContent,
//     CardActions,
//     Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// // Define the types for cartItem
// interface CartItem {
//     image: string;
//     name: string;
//     price: number;
//     quantity: number;
// }

// interface CartPageProps {
//     cartItems: CartItem[];
// }

// const CartPage: React.FC<CartPageProps> = ({ cartItems = [] }) => {
//     const isEmpty = cartItems.length === 0;
//     const navigate = useNavigate();

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 backgroundColor: "#f5f5f5",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//             <Box
//                 sx={{
//                     width: "100%",
//                     maxWidth: 800,
//                     backgroundColor: "white",
//                     boxShadow: 3,
//                     borderRadius: 2,
//                     p: 3,
//                 }}
//             >
//                 {isEmpty ? (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             textAlign: "center",
//                             py: 4,
//                         }}
//                     >
//                         <img
//                             src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
//                             alt="Empty Cart"
//                             style={{ width: 150, height: 150 }}
//                         />
//                         <Typography
//                             sx={{
//                                 mt: 2,
//                                 fontSize: 20,
//                                 fontFamily: '"Playfair Display", serif',
//                                 fontStyle: "italic",
//                                 fontWeight: 550,
//                             }}
//                         >
//                             Oops! Your Cart is Empty
//                         </Typography>
//                         <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
//                             Looks like you haven't added anything to your cart yet!
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             sx={{
//                                 mt: 3,
//                                 px: 4,
//                                 py: 1.5,
//                                 borderRadius: "50px", // Fully rounded button
//                                 background: "linear-gradient(to right, #4facfe, #00f2fe)", // Linear gradient
//                                 color: "white",
//                                 fontWeight: "bold",
//                                 textTransform: "none", // Prevents uppercase text
//                                 boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
//                                 "&:hover": {
//                                     background: "linear-gradient(to right, #00c6fb, #005bea)", // Hover effect gradient
//                                     boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
//                                 },
//                             }}
//                             onClick={() => navigate("/")} // Change to your desired path
//                         >
//                             Explore
//                         </Button>
//                     </Box>
//                 ) : (
//                     <>
//                         <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
//                             Your Cart
//                         </Typography>
//                         <Grid container spacing={3}>
//                             {cartItems.map((item, index) => (
//                                 <Grid item xs={12} key={index}>
//                                     <Card sx={{ display: "flex", alignItems: "center" }}>
//                                         <CardMedia
//                                             component="img"
//                                             image={item.image}
//                                             alt={item.name}
//                                             sx={{ width: 100, height: 100, objectFit: "cover" }}
//                                         />
//                                         <CardContent sx={{ flex: 1 }}>
//                                             <Typography variant="h6">{item.name}</Typography>
//                                             <Typography
//                                                 variant="body2"
//                                                 color="textSecondary"
//                                                 sx={{ mt: 1 }}
//                                             >
//                                                 ${item.price} x {item.quantity}
//                                             </Typography>
//                                         </CardContent>
//                                         <CardActions>
//                                             <Typography
//                                                 variant="body1"
//                                                 fontWeight="bold"
//                                                 sx={{ mx: 2 }}
//                                             >
//                                                 Total: ${item.price * item.quantity}
//                                             </Typography>
//                                         </CardActions>
//                                     </Card>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//                             <Button variant="contained" color="success">
//                                 Proceed to Checkout
//                             </Button>
//                         </Box>
//                     </>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default CartPage;
import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
  Divider,
  Stack,
  IconButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ModeSharpIcon from '@mui/icons-material/ModeSharp'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { addProduct, removeProduct, incrementQuantity, decrementQuantity } from '../../../redux/slices/cartSlice'
import { useAuthContext } from '../../../hooks/AuthContext'
import ConfirmationDialog from '../../../components/controls/ConfirmationDialog'
import { addWishlistItem, removeWishlistItem } from '../../../redux/slices/wishlistSlice'
import toast from 'react-hot-toast'


const baseUrl = import.meta.env.VITE_BASEURL;

const CartPage: React.FC = () => {
  const { isAuthenticated } = useAuthContext()
  const dispatch = useDispatch();
  // Fetch wishlist items from Redux store
  const wishlistItems = useSelector((state: any) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.products) // Use selector to get cart items
  const isEmpty = cartItems.length === 0
  const navigate = useNavigate()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'My Account', href: '/account' },
    { label: 'My Cart' } // No href for current page
  ]

  const handleOpen = () => {
    setOpenConfirm(true)
  }

  // Handle closing the confirmation dialog
  const handleClose = () => {
    setOpenConfirm(false)

  }

  const handleRemove = (item: any) => {
    setSelectedProduct(item)
    handleOpen()
  }

  const handleConfirmRemove = () => {
    dispatch(removeProduct({ id: selectedProduct.id }))
    handleClose()
  }

  const handleAddToWishlist = (product: any) => {
    console.log('product', product)
    // Check if the product is already in the wishlist
    const existingItem = wishlistItems?.find((item: any) => item._id === product._id);

    if (existingItem) {
      // If it's in the wishlist, remove it
      dispatch(removeWishlistItem({ id: product._id }));
      toast.success('Product removed from wishlist')
    } else {
      // If it's not in the wishlist, add it
      dispatch(addWishlistItem(product));
      toast.success('Product added to wishlist')
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgb(243, 241, 236)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pb: 5,
        pt: 5
      }}
    >
      {
        // !isAuthenticated ? (
        //   <Box
        //     sx={{
        //       width: '100%',
        //       maxWidth: 800,
        //       backgroundColor: 'white',
        //       boxShadow: 3,
        //       borderRadius: 2,
        //       p: 2,
        //       m: 1
        //     }}
        //   >
        //     <Box
        //       sx={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         textAlign: 'center',
        //         py: 4
        //       }}
        //     >
        //       <img
        //         src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png'
        //         alt='Empty Cart'
        //         style={{ width: 150, height: 150 }}
        //       />
        //       <Typography
        //         sx={{
        //           mt: 2,
        //           fontSize: 20,
        //           fontFamily: '"Playfair Display", serif',
        //           fontStyle: 'italic',
        //           fontWeight: 550
        //         }}
        //       >
        //         Oops! Misssing cart items?
        //       </Typography>
        //       <Typography variant='body1' color='textSecondary' sx={{ mt: 1 }}>
        //         Login to see the items you added previously
        //       </Typography>
        //       <Button
        //         variant='contained'
        //         sx={{
        //           mt: 3,
        //           px: 4,
        //           py: 1.5,
        //           borderRadius: '50px', // Fully rounded button
        //           background: 'linear-gradient(to right, #4facfe, #00f2fe)', // Linear gradient
        //           color: 'white',
        //           fontWeight: 'bold',
        //           textTransform: 'none', // Prevents uppercase text
        //           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        //           '&:hover': {
        //             background: 'linear-gradient(to right, #00c6fb, #005bea)', // Hover effect gradient
        //             boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
        //           }
        //         }}
        //         onClick={() => navigate('/auth/signin')} // Change to your desired path
        //       >
        //         Login
        //       </Button>
        //     </Box>
        //   </Box>
        // ) : 
        isEmpty ? (
          <Box
            sx={{
              width: '100%',
              maxWidth: 800,
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
                src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png'
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
                Oops! Your Cart is Empty
              </Typography>
              <Typography variant='body1' color='textSecondary' sx={{ mt: 1 }}>
                Looks like you haven't added anything to your cart yet!
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
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start' // Align to the top
              }}
            >
              <Grid container spacing={1} sx={{ width: '100%', maxWidth: 1200 }}>
                {/* Left side: Cart items */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ borderRadius: 2 }}>
                    <Grid container spacing={2}>
                      {cartItems.map((item, index) => (
                        <Grid item xs={12} key={index}>
                          <Card
                            elevation={0}
                            sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: { xs: 2, sm: 3 }
                            }}
                          >
                            {/* Left Section: Image and Description */}
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                width: { xs: '100%', sm: '60%' },
                                mb: { xs: 2, sm: 0 }
                              }}
                            >
                              <CardMedia
                                component='img'

                                image={`${baseUrl}/uploads/${item.image}`}
                                alt={item.name}
                                sx={{
                                  width: 100,
                                  height: 100,
                                  objectFit: 'contain',
                                  mb: { xs: 1, sm: 0 },
                                  mr: { sm: 2 },
                                  borderRadius: 1,
                                  border: '1px solid #f0f0f0'
                                }}
                              />
                              <Box>
                                <Typography sx={{ fontSize: 17, fontWeight: 'bold' }}>
                                  {item.name}
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'gray', mb: 1 }}>
                                  {item.description}
                                </Typography>
                                <Stack direction={'row'}>
                                  <Typography sx={{ fontSize: 14, mb: 0.5, fontWeight: 550 }}>
                                    Size :
                                  </Typography>
                                  <Typography sx={{ fontSize: 14, color: 'gray', mb: 0.5, ml: 1 }}>
                                    {item.size}
                                  </Typography>
                                </Stack>

                                <Typography sx={{ fontSize: 15, fontWeight: 550, color: 'gray', mb: 1 }}>
                                  ₹ {item.price}
                                </Typography>

                              </Box>
                            </Box>

                            {/* Right Section: Quantity and Actions */}
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'flex-start', sm: 'flex-end' },
                                width: { xs: '100%', sm: '35%' },
                                height: 'auto'
                              }}
                            >
                              {/* Quantity Label and Buttons */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                  width: { xs: '100%', sm: 'auto' },
                                  mb: 4
                                }}
                              >
                                <Typography sx={{ fontWeight: 'bold', fontSize: 14, mr: 2 }}>
                                  Quantity
                                </Typography>
                                <IconButton
                                  sx={{ color: 'gray', border: '1px solid #f0f0f0', borderRadius: 1 }}
                                  onClick={() => dispatch(decrementQuantity({ id: item.id }))}
                                >
                                  <RemoveIcon sx={{ fontSize: 14, fontWeight: 600 }} />
                                </IconButton>
                                <Typography sx={{ mx: 2, fontWeight: 'bold', fontSize: 16 }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  sx={{ color: 'gray', border: '1px solid #f0f0f0', borderRadius: 1 }}
                                  onClick={() => dispatch(incrementQuantity({ id: item.id }))}
                                >
                                  <AddIcon sx={{ fontSize: 14, fontWeight: 600 }} />
                                </IconButton>
                              </Box>

                              {/* Action Buttons */}
                              <Stack direction='row' spacing={1} sx={{ justifyContent: { xs: 'space-between', sm: 'flex-end' }, width: '100%' }}>
                                <Button
                                  variant='text'
                                  size='small'
                                  sx={{ color: '#00c6fb', fontWeight: 550, fontSize: 12 }}
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the card's onClick
                                    handleAddToWishlist(item);
                                  }}
                                >
                                  Move to Wishlist
                                </Button>
                                <Stack direction={'row'} spacing={1}>
                                  <IconButton
                                    color='error'
                                    size='small'
                                    // onClick={() => dispatch(removeProduct({ id: item.id }))}
                                    onClick={() => handleRemove(item)}
                                  >
                                    <DeleteOutlineSharpIcon />
                                  </IconButton>

                                </Stack>
                              </Stack>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* Right side: Total amount and checkout button */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 3, border: '1px solid #E5E4E2', backgroundColor: 'white' }}>
                    <Typography fontWeight='bold' sx={{ mb: 2, color: '#708090', fontSize: 19 }}>
                      Cart Summary ({`Items ${cartItems.length}`})
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography sx={{ fontSize: 18, fontWeight: 550 }}>
                        ₹{calculateTotalPrice()}
                      </Typography>
                      <Typography>{`(including Tax)`}</Typography>
                    </Stack>

                    <Button
                      variant='contained'
                      color='success'
                      fullWidth
                      sx={{
                        mt: 3,
                        px: 4,
                        py: 1.5,
                        height: 35,
                        borderRadius: '50px', // Fully rounded button
                        background: 'linear-gradient(to right, #00c6fb, #005bea)', // Linear gradient
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none', // Prevents uppercase text
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                          background: 'linear-gradient(to right, #00c6fb, #005bea)', // Hover effect gradient
                          boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
                        }
                      }}
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        )}

      {/* ConfirmationBox Component */}
      <ConfirmationDialog
        open={openConfirm}
        title='Confirm Action'
        content={
          <Stack spacing={1}>
            <Typography>
              Are you sure you want to remove this product from cart?
            </Typography>
            <Typography>
              <strong>Product Name:</strong> {selectedProduct?.name}
            </Typography>

          </Stack>
        }
        handleClose={handleClose}
        confirmTitle='Yes, Confirm'
        handleConfirm={handleConfirmRemove}
        zIndex={1300} // Optional, default Material UI z-index
      />
    </Box>
  )
}

export default CartPage


