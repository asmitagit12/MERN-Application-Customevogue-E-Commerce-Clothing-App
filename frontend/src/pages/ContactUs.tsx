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
                     fontSize: { xs: "1.5rem", md: "2rem" },
                     textTransform: "uppercase",
                   }}
                 >
                   Contact <span style={{ color: "#000" }}>Us</span> —
                 </Typography>
            {/* <Stack direction="row" alignItems="center" justifyContent={'center'} spacing={2} width={'100%'}>
                <Stack direction="row" alignItems="center" justifyContent={'center'} width={'40%'}>

                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            mb: { xs: 2, md: 3 },
                            fontSize: { xs: "1.5rem", md: "2rem" },
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Box flex={1}>
                        <Divider sx={{ bgcolor: '#808080' }} />
                    </Box>
                </Stack>
            </Stack> */}
            {/* Layout */}
            <Grid
                container
                spacing={4}
                alignItems="flex-start"
                justifyContent={'center'}
                sx={{
                    flexDirection: { xs: "column", md: "row" },
                    textAlign: { xs: "center", md: "left" },
                }}
            >
                {/* Image Section */}
                <Grid item xs={12} md={5}>
                    <Card elevation={0} sx={{ borderRadius: "10px", overflow: "hidden" }}>
                        <CardMedia
                            component="img"
                            image={contact} // Replace with actual image
                            alt="Office desk"
                            sx={{
                                width: "100%",
                                height: { xs: "250px", sm: "300px", md: "90%" },
                                objectFit: "cover",
                            }}
                        />
                    </Card>
                </Grid>

                {/* Contact Info Section */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
                        Our Store
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                        54709 Willms Station <br />
                        Suite 350, Washington, USA
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                        Tel: (415) 555-0132 <br />
                        Email: admin@customevogue.com
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold",color:'gray', mt: 3, fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
                        Careers at Customevogue
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
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
                            // padding: { xs: "6px 14px", md: "10px 20px" },
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
