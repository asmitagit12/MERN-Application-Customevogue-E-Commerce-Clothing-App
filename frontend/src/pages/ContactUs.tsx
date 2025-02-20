import React from "react";
import { Box, Grid, Typography, Button, Card, CardMedia } from "@mui/material";
import contact from '../assets/contact_img.png'

const ContactUs: React.FC = () => {
    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3, md: 5 } }}>
            {/* Title */}
            <Typography
                variant="h5"
                align="left"
                sx={{
                    fontWeight: "bold",
                    mb: { xs: 2, md: 3 },
                    pl:3,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    textTransform: "uppercase",
                }}
            >
                Contact <span style={{ color: "#000" }}>Us</span> —
            </Typography>

            {/* Layout */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent={'center'}
                sx={{
                    flexDirection: { xs: "column", md: "row",sm:'row',lg:'row' },
                    textAlign: { xs: "center", md: "left" },
                }}
            >
                {/* Image Section */}
                <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card elevation={0} sx={{ borderRadius: "10px", overflow: "hidden", maxWidth: { xs: "100%", sm: "80%", md: "100%" }, display: "flex", justifyContent: "center" }}>
                        <CardMedia
                            component="img"
                            image={contact} // Replace with actual image
                            alt="Office desk"
                            sx={{
                                width: "100%",
                                height: { xs: "100%", sm: "300px", md: "90%" },
                                objectFit: "cover",
                                display: "block",
                                margin: "0 auto"
                            }}
                        />
                    </Card>
                </Grid>

                {/* Contact Info Section */}
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" } }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
                        Our Store
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, textAlign: { xs: "center", md: "left" } }}>
                        54709 Willms Station <br />
                        Suite 350, Washington, USA
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: "0.9rem", md: "1rem" }, textAlign: { xs: "center", md: "left" } }}>
                        Tel: (415) 555-0132 <br />
                        Email: admin@customevogue.com
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold", color: 'gray', mt: 3, fontSize: { xs: "1.2rem", md: "1.5rem" }, textAlign: { xs: "center", md: "left" } }}>
                        Careers at Customevogue
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, textAlign: { xs: "center", md: "left" } }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                    {/* Explore Jobs Button */}
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            borderRadius: "20px",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: { xs: "0.8rem", md: "1rem" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        Explore Jobs
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactUs;