import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Facebook, Instagram, Pinterest } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#35363a", color: "white", p: 4 }}>
      <Grid container spacing={4}>
        {/* Information Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom fontWeight={550}>
            INFORMATION
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Home</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Collection</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>About Us</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Contact Us</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Sitemap</Typography>
          </Stack>
        </Grid>

        {/* Our Policies Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom fontWeight={550}>
            OUR POLICIES
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>About Us</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Return & Refund</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Terms & Conditions</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Privacy Policy</Typography>
            <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Delivery & Shipping</Typography>
          </Stack>
        </Grid>

        {/* Contact Us Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom fontWeight={550}>
            CONTACT US
          </Typography>
          <Typography variant="body2" sx={{color:'#999',fontSize:15}}>
            B – 33, 325/5 Near, LM Lorem Lorem ,
            <br />
            Lorem Lorem , Lorem Lorem ,
            <br />
            Lorem, Lorem 141008
          </Typography>
          <Typography variant="body2" sx={{ mt: 2,color:'#999',fontSize:15 }}>
            Phone: 6756467876
          </Typography>
          <Typography variant="body2" sx={{color:'#999',fontSize:15}}>Email: customercare.customvogue@gmail.com</Typography>
        </Grid>

        {/* Newsletter Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom fontWeight={550}>
            SUBSCRIBE OUR NEWSLETTER
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Your email address"
              sx={{
                bgcolor: "white",
                borderRadius: "4px",
                flexGrow: 1,
                mr: 1,
              }}
            />
            <Button variant="contained" color="primary" sx={{ borderRadius: "4px" }}>
              &gt;
            </Button>
          </Box>
          <Typography variant="caption" sx={{ mt: 1, display: "block" ,color:'#999',fontSize:14}}>
            By signing up for email, you agree to Octave's{" "}
            <Typography
              variant="caption"
              component="span"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Terms of Service
            </Typography>{" "}
            and{" "}
            <Typography
              variant="caption"
              component="span"
              sx={{ textDecoration: "underline", cursor: "pointer" ,color:'#999'}}
            >
              Privacy Policy
            </Typography>
            .
          </Typography>
          {/* Social Media Icons */}
          <Box sx={{ display: "flex", mt: 2 }}>
            <IconButton sx={{ color: "#999" }}>
              <Facebook sx={{fontSize:26}}/>
            </IconButton>
            <IconButton sx={{ color: "#999" }}>
              <Instagram sx={{fontSize:26}}/>
            </IconButton>
            <IconButton sx={{ color: "#999" }}>
              <Pinterest sx={{fontSize:26}} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography sx={{color:'#999',fontSize:17}}>
          Copyright © 2024 CustomVogue Clothing Pvt Ltd. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
