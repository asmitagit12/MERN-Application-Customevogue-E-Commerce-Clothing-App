import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselControlProps = {
    images: string[]; // Array of image URLs
    height?: string; // Optional height for the carousel
};

const CarouselControl: React.FC<CarouselControlProps> = ({ images, height }) => {
 

    const settings = {
        autoplay: true,
        dots: true,
        infinite: images.length > 1,
        speed: 5000,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrows: true, // Enable default arrows
        pauseOnHover: true,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: height || '100%', // Ensure the div takes full height of the parent
                        width: '100%',
                    }}
                >
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{
                            width: '100%', // Ensure images fill the container
                            height: '100%', // Make sure the image height fits the container
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0 auto',
                        }}
                    />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselControl;
