import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Radio,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuthContext } from "../../../hooks/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getUserAddresses } from "../../../services/user/addressService";
import { useNavigate } from "react-router-dom";

type Address = {
  _id: string;
  name: string;
  addressType: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
};

const baseUrl = import.meta.env.VITE_BASEURL;
const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.products)
  const userID = user?._id as string
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orderSummary, setOrderSummary] = useState({ items: 5, totalPrice: 1366 });
  const [priceDetails, setPriceDetails] = useState({});

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/auth/signin')
    }

  },[isAuthenticated])

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userID) return
      // setLoading(true)
      try {
        const response = await getUserAddresses(userID)
        setAddresses(response.data)
      } catch (error) {
        console.error("Failed to fetch addresses", error)
      } finally {
        // setLoading(false)
      }
    }

    fetchAddresses()
  }, [userID])
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?._id || "");

   // Price Calculation
   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
   const deliveryCharges = totalPrice > 1000 ? 0 : 50;
   const platformFee = 10;
   const savings = totalPrice > 1000 ? 100 : 50;
   const totalPayable = totalPrice + deliveryCharges + platformFee - savings;
  return (
    <Box display="flex" justifyContent="center" p={3}>
      <Box width="60%" mr={3}>
        <Accordion
          expanded={currentStep === 1}
          onChange={() => setCurrentStep(1)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: 17, color: '#36454F', fontWeight: 550 }}>
              1 LOGIN {isAuthenticated && <CheckCircleIcon color="success" fontSize="small" />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {isAuthenticated && user ? (
              <>
                <Typography fontWeight="bold">Name: {`${user?.firstName} ${user?.lastName}`}</Typography>
                <Typography>Phone: {user?.mobile}</Typography>
                <Button color="primary" sx={{ fontSize: 13 }}>Logout & Sign in to another account</Button>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  sx={{ mt: 3, px: 4, py: 1.5, height: 35 }}
                  onClick={() => setCurrentStep(2)}
                >
                  CONTINUE CHECKOUT
                </Button>
              </>
            ) : (
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Typography color="error">Please log in to proceed.</Typography>
                <Button color="primary" sx={{ fontSize: 13 }} onClick={()=>{navigate('/auth/signin')}}>Sign In for continue checkout</Button>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Delivery Address */}
        <Accordion
          expanded={isAuthenticated && currentStep === 2}
          onChange={() => isAuthenticated && currentStep === 1 && setCurrentStep(2)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: 17, color: '#36454F', fontWeight: 550 }}>
              2 DELIVERY ADDRESS {currentStep > 2 && <CheckCircleIcon color="success" fontSize="small" />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <Box key={addr._id} display="flex" alignItems="center" p={1}>
                  <Radio
                    checked={selectedAddress === addr._id}
                    onChange={() => setSelectedAddress(addr._id)}
                  />
                  <Box>
                    <Typography fontWeight="bold">{addr.name} ({addr.addressType})</Typography>
                    <Typography>{addr.streetAddress}, {addr.city}, {addr.state}, {addr.pinCode}, {addr.country}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No saved addresses. Add a new address.</Typography>
            )}
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{ mt: 3, px: 4, py: 1.5, height: 35 }}
              onClick={() => selectedAddress && setCurrentStep(3)}
              disabled={!selectedAddress} // Prevents clicking if no address selected
            >
              CONTINUE
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Order Summary */}
         {/* Order Summary */}
         <Accordion expanded={isAuthenticated && currentStep === 3} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: 17, color: "#36454F", fontWeight: 550 }}>
              3 ORDER SUMMARY{currentStep > 3 && <CheckCircleIcon color="success" fontSize="small" />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between" p={1}>
                  <Box display="flex" alignItems="center">
                    <img
                      src={`${baseUrl}/uploads/${item.image}`}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ borderRadius: 5, marginRight: 10 }}
                    />
                    <Box>
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <Typography>Size: {item.size}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                    </Box>
                  </Box>
                  <Typography fontWeight="bold">₹{item.price * item.quantity}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No items in the cart</Typography>
            )}
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{ mt: 3, px: 4, py: 1.5, height: 35 }}
              onClick={() => setCurrentStep(4)}
            >
              CONTINUE
            </Button>
          </AccordionDetails>
        </Accordion>


        {/* Payment Options */}
        <Accordion
          expanded={isAuthenticated && currentStep === 4}
          onChange={() => isAuthenticated && currentStep === 3 && setCurrentStep(4)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: 17, color: '#36454F', fontWeight: 550 }}>
              4 PAYMENT METHODS {selectedPayment && <CheckCircleIcon color="success" fontSize="small" />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
                <FormControlLabel value="stripe" control={<Radio />} label="Credit/Debit Card (Stripe)" />
                <FormControlLabel value="razorpay" control={<Radio />} label="UPI / Net Banking (Razorpay)" />
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{
                mt: 3,
                px: 4,
                py: 1.5,
                height: 35,
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
              onClick={() => alert(`Selected Payment Mode: ${selectedPayment}`)}
              disabled={!selectedPayment || !isAuthenticated}
            >
              Place Order
            </Button>
          </AccordionDetails>
        </Accordion>



      </Box>

     {/* Right Section - Price Details */}
     <Box width="30%">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              PRICE DETAILS
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Price ({cartItems.length} Items): ₹{totalPrice}</Typography>
            <Typography color="green">Delivery Charges: ₹{deliveryCharges === 0 ? "Free" : deliveryCharges}</Typography>
            <Typography>Platform Fee: ₹{platformFee}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" fontWeight="bold">Total Payable: ₹{totalPayable}</Typography>
            <Typography color="green" fontWeight="bold">
              Your Total Savings: ₹{savings}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Checkout;
