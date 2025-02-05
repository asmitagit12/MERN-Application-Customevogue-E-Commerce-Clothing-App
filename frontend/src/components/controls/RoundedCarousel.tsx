import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Custom arrow components
type ArrowProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ArrowLeft: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-20px", // Move outside the carousel
      transform: "translateY(-50%)",
      backgroundColor: "#fff",
      color: "#333",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 10
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
      right: "-30px", // Move outside the carousel
      transform: "translateY(-50%)",
      backgroundColor: "#fff",
      color: "#333",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 10,
    }}
  >
    <ArrowForwardIosIcon />
  </div>
);

type RoundedCarouselProps = {
  items: {
    image: string;
    label: string;
  }[];
};

const RoundedCarousel: React.FC<RoundedCarouselProps> = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <ArrowRight />, // Custom right arrow
    prevArrow: <ArrowLeft />,  // Custom left arrow
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Box sx={{ position: "relative", padding: "20px", width: '90%' }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "10px",
              // width:'50%'
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.label}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "50%", // Round the images
              }}
            />
            {/* Label */}
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "8px",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                color: "#333",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RoundedCarousel;
