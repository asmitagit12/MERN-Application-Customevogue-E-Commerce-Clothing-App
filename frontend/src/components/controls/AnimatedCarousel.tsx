import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";

// Types for custom arrow props
interface ArrowProps {
  onClick?: () => void;
}

// Custom arrow components
const ArrowLeft: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-50px", // Move outside the carousel
      transform: "translateY(-50%)",
      backgroundColor: "#fff",
      color: "#333",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 10,
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    }}
  >
    <ArrowBackIosNewIcon />
  </div>
);

const ArrowRight: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "-50px", // Move outside the carousel
      transform: "translateY(-50%)",
      backgroundColor: "#fff",
      color: "#333",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 10,
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    }}
  >
    <ArrowForwardIosIcon />
  </div>
);

interface AnimatedCarouselProps {
  images: { src: string; alt?: string }[]; // Array of images with optional alt text
}

const AnimatedCarousel: React.FC<AnimatedCarouselProps> = ({ images }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
    prevArrow: <ArrowLeft />, // Use custom left arrow
    nextArrow: <ArrowRight />, // Use custom right arrow
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <Box sx={{ position: "relative", padding: "20px", width: "90%" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#E5E4E2",
            }}
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              style={{
                maxWidth: "90%",
                objectFit: "cover",
                border: "8px solid white",
              }}
            />
            {/* Apply global styles with styled-jsx */}
            <style>{`
              :global(.slick-center img) {
                transform: scale(1); /* Larger scale for centered image */
                transition: transform 0.5s ease; /* Smooth scaling transition */
              }
              :global(img) {
                transform: scale(0.8); /* Default scale for non-centered images */
                transition: transform 0.5s ease;
              }
            `}</style>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default AnimatedCarousel;
