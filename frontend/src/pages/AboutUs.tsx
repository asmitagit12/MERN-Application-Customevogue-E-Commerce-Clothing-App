import React from "react";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
import about from '../assets/about.png'
const AboutUs: React.FC = () => {
  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3, md: 5 } }}>
      {/* Title */}
      <Typography
        variant="h5"
        align="left"
        sx={{
          fontWeight: "bold",
          mb: { xs: 2, md: 3 },
          fontSize: { xs: "1.5rem", md: "2rem" },
          textTransform: "uppercase",
        }}
      >
        About <span style={{ color: "#000" }}>Us</span> —
      </Typography>

      {/* Layout */}
      <Grid
        container
        spacing={4}
        alignItems="flex-start"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: "10px", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={about} // Replace with actual image
              alt="Fashion collection"
              sx={{
                width: "100%",
                height: { xs: "250px", sm: "300px", md: "100%" },
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>

        {/* About Us Content */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
            Constumevogue was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
            Since our inception, we’ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </Typography>

          {/* Mission Section */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
            Our Mission
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
            Our mission at Constumevogue is to empower customers with choice, convenience, and confidence. We’re dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
