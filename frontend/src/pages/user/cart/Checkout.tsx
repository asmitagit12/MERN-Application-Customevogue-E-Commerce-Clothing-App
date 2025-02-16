import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuthContext } from "../../../hooks/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const user = useSelector((state: RootState) => state.auth.user);

  const [addresses, setAddresses] = useState([
    {
      _id: "67af516860efe3290ca30ca9",
      userId: "6766f39d331ceaa37b54b9f8",
      name: "Vaishnavi",
      streetAddress: "Near School",
      city: "Kolhapur, Maharashtra",
      state: "Maharashtra",
      pinCode: "416235",
      country: "India",
      addressType: "HOME",
      createdAt: "2025-02-14T14:21:28.120Z",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?._id || "");
  const [orderSummary, setOrderSummary] = useState({ items: 5, totalPrice: 1366 });
  const [priceDetails, setPriceDetails] = useState({
    price: 1366,
    deliveryCharges: "FREE",
    platformFee: 3,
    totalPayable: 1369,
    savings: 6175,
  });

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Box display="flex" justifyContent="center" p={3}>
      <Box width="60%" mr={3}>
        {/* Login Section */}
        <Accordion expanded={currentStep === 1} onChange={() => setCurrentStep(1)} sx={{mb:2}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
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
                  sx={{ mt: 2 }} 
                  onClick={() => setCurrentStep(2)}
                >
                  CONTINUE CHECKOUT
                </Button>
              </>
            ) : (
              <Typography color="error">Please log in to proceed.</Typography>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Delivery Address Section */}
        <Accordion expanded={currentStep === 2} onChange={() => setCurrentStep(2)} sx={{mb:2}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
              2 DELIVERY ADDRESS {currentStep > 2 && <CheckCircleIcon color="success" fontSize="small" />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <Box
                  key={addr._id}
                  display="flex"
                  alignItems="center"
                  p={1}
                  sx={{ borderBottom: "1px solid #ddd", mb: 1, pb: 1 }}
                >
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
              sx={{ mt: 2 }} 
              onClick={() => setCurrentStep(3)}
            >
              CONTINUE
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Order Summary Section */}
        <Accordion expanded={currentStep === 3} onChange={() => setCurrentStep(3)} sx={{mb:2}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
              3 ORDER SUMMARY {currentStep > 3 && <CheckCircleIcon color="success" fontSize="small" />}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Items: {orderSummary.items}</Typography>
            <Typography>Total Price: ₹{orderSummary.totalPrice}</Typography>
            <Button 
              variant="contained" 
              color="warning" 
              fullWidth 
              sx={{ mt: 2 }} 
              onClick={() => setCurrentStep(4)}
            >
              CONTINUE
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Payment Options Section */}
        <Accordion expanded={currentStep === 4} onChange={() => setCurrentStep(4)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
              4 PAYMENT OPTIONS
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Select a payment method</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Right Section (Price Details) */}
      <Box width="30%">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight="bold">PRICE DETAILS</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Price ({orderSummary.items} items): ₹{priceDetails.price}</Typography>
            <Typography color="green">Delivery Charges: {priceDetails.deliveryCharges}</Typography>
            <Typography>Platform Fee: ₹{priceDetails.platformFee}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" fontWeight="bold">Total Payable: ₹{priceDetails.totalPayable}</Typography>
            <Typography color="green" fontWeight="bold">Your Total Savings: ₹{priceDetails.savings}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Checkout;
