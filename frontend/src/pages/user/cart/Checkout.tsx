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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getUserAddresses } from "../../../services/user/addressService";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../../services/user/orderService";
import razorpayLogo from '../../../assets/razorpay.png'
import { createRazorpayOrder, verifyRazorpayPayment } from "../../../services/user/paymentService";
import { emptyCart } from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";

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
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/signin')
    }

  }, [isAuthenticated])

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userID) return
      // setLoading(true)
      try {
        const response = await getUserAddresses(userID)
        setAddresses(response.data)
      } catch (error) {
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

  const handlePlaceOrder = async () => {
    try {
      const orderPayload = {
        userId: userID,
        items: cartItems?.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalPayable,
        paymentMethod: selectedPayment,
      };

      const response = await placeOrder(orderPayload).catch(() => null);
      if (!response) return;
      toast.success("Order placed successfully!");
      navigate("/orders");
      dispatch(emptyCart());
    } catch (err) {
      console.log("Failed to place order. Please try again.");
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const amountInPaise = Math.round(Number(totalPayable) * 100);
      const res = await createRazorpayOrder(amountInPaise);
      const order_id = res?.orderId;
      const currency = res?.currency;

      if (!order_id) {
        toast.error("Invalid Razorpay order response");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency,
        name: "Your Store Name",
        description: "Order Payment",
        order_id,                           // FIX 4
        handler: async function (paymentResult: any) {
          const verifyRes = await verifyRazorpayPayment({
            razorpay_payment_id: paymentResult.razorpay_payment_id,
            razorpay_order_id: paymentResult.razorpay_order_id,
            razorpay_signature: paymentResult.razorpay_signature,
            userId: userID,
            items: cartItems,
            totalAmount: totalPayable,
          });

          if (verifyRes?.success) {
            toast.success("Payment successful!");
            navigate("/orders");
            dispatch(emptyCart());
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error("Payment failed");
    }
  };





  return (
    <Box display="flex" flexWrap={'wrap'} justifyContent="center" rowGap={2} flexDirection={{ xs: 'column', md: 'row' }} height={'auto'} p={3}>
      <Box width={{ xs: "100%", md: "60%" }} mr={3}>
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
                  sx={{
                    mt: 3, px: 4, py: 1.5, height: 35,
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
                  onClick={() => setCurrentStep(2)}
                >
                  CONTINUE CHECKOUT
                </Button>
              </>
            ) : (
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Typography color="error">Please log in to proceed.</Typography>
                <Button color="primary" sx={{ fontSize: 13 }} onClick={() => { navigate('/auth/signin') }}>Sign In for continue checkout</Button>
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
              sx={{
                mt: 3, px: 4, py: 1.5, height: 35,
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
                      src={`${baseUrl}api/uploads/${item.image}`}
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
              sx={{
                mt: 3, px: 4, py: 1.5, height: 35,
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
                <FormControlLabel
                  value="RAZORPAY"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <img src={razorpayLogo} alt="razorpay" width={60} />
                      <Typography>UPI / NetBanking (Razorpay)</Typography>
                    </Box>
                  }
                />

                <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery (Only COD available)" />
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
                background: 'linear-gradient(to right, #00c6fb, #005bea)',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(to right, #00c6fb, #005bea)',
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
                }
              }}
              onClick={() => {
                if (selectedPayment === "COD") {
                  handlePlaceOrder();
                } else if (selectedPayment === "RAZORPAY") {
                  handleRazorpayPayment();
                }
              }}
              disabled={!selectedPayment || !isAuthenticated}
            >
              Place Order
            </Button>
          </AccordionDetails>
        </Accordion>



      </Box>

      {/* Right Section - Price Details */}
      <Box width={{ xs: "100%", md: "30%" }}>
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

