import React, { useRef, useState } from 'react'
import CarouselControl from '../components/controls/CarouselControl'

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material'

import RoundedCarousel from '../components/controls/RoundedCarousel'


type ImageLabel = {
  image: string
  label: string
}


type CardData = {
  title: string
  description: string
  image: string
}



const Dashboard: React.FC = () => {
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1 // Adjust the multiplier for sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }
  
  const images: string[] = [
    'https://img.theloom.in/pwa/loom/banners/26nov-2024-New-Launches-Desktop-Banner.jpg?tr=h-624%2Cw-1600',
    'https://img.theloom.in/pwa/loom/banners/29nov-2024-Flash-Sale-2024-3840-1500-Main-Desktop-Banner.jpg?tr=h-624%2Cw-1600',
    // 'https://img.theloom.in/pwa/loom/banners/5Nov2024-LoomExclusive-Desktop_MainBanner.png?tr=h-624%2Cw-1600',
    'https://img.theloom.in/pwa/loom/banners/PriyaChaudhary_PC34_websitebanner.jpg?tr=h-624%2Cw-1600'
  ]

  const items: ImageLabel[] = [
    {
      image: 'https://img.theloom.in/pwa/loom/banners/26nov-2024-Dresses.png',
      label: 'Dresses'
    },
    {
      image:
        'https://img.theloom.in/pwa/loom/banners/26nov-2024-Co-ord-sets.png',
      label: 'Co-ord-sets'
    },
    {
      image: 'https://img.theloom.in/pwa/loom/banners/26nov-2024-Suit-set.png',
      label: 'Suit-set'
    },
    {
      image: 'https://img.theloom.in/pwa/loom/banners/26nov-2024-Velvet.png',
      label: 'Velvet'
    },
    {
      image:
        'https://img.theloom.in/pwa/loom/banners/26nov-2024-Bestsellers.png',
      label: 'Bestsellers'
    },
    {
      image: 'https://img.theloom.in/pwa/loom/banners/26nov-2024-Wedding.png',
      label: 'Wedding'
    },
    {
      image: 'https://img.theloom.in/pwa/loom/banners/26nov-2024-Sarees.png',
      label: 'Sarees'
    }
  ]

 

  const cardData: CardData[] = [
    {
      title: 'Light Layers',
      description: 'Your go-to layering piece for light to medium winters',
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241115_LightLayers_Homepage_SBO_App' // Replace with the actual image URL or path
    },
    {
      title: 'Wedding Perfect',
      description: 'Look sharp, feel dapper with our kurta collection',
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241115_WeddingPerfect_Homepage_SBO_App' // Replace with the actual image URL or path
    },
    {
      title: 'Winterwear Sets',
      description: 'Joyful vibes & cozy comfort for your lil’ ones',
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241115_WinterwearSets_Homepage_SBO_App' // Replace with the actual image URL or path
    },
    {
      title: 'Trendy Fits',
      description: 'Fashion-forward designs and unbeatable comfort',
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241128_Overlay_MFL_App' // Replace with the actual image URL or path
    }
  ]

 

  const ImageCategories: ImageLabel[] = [
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241114_Women_Homepage_Thumbnail?&wid=300&fit=wrap',
      label: 'Women'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241114_Men_Homepage_Thumbnail?&wid=300&fit=wrap',
      label: 'Men'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/221114_Kids_homepage_Thumbnail?&wid=300&fit=wrap',
      label: 'Kids'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/winters_28nov221114_Kids_winterwear_?&wid=300&fit=wrap',
      label: 'Fresh Styles'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241114_Home_Homepage_Thumbnail?&wid=300&fit=wrap',
      label: 'Home'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241114_mickeymouse_homepage_thumbnail?&wid=300&fit=wrap',
      label: 'Character Store'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/20241114_WeddingEdit_Homepage_Thumbnail?&wid=300&fit=wrap',
      label: 'Wedding'
    },
    {
      image:
        'https://s7ap1.scene7.com/is/image/adityabirlafashion/winters_28nov221114_Kids_winterwear_?&wid=300&fit=wrap',
      label: 'Winter'
    }
  ]

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* main dashboard carousel */}
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        mt={6}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box width={'90%'} height={{ md: '90vh', xs: '100%' }}>
          <CarouselControl images={images} height='90vh' />{' '}
        </Box>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            padding: 2,
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#aaa',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f4f4f4'
            }
          }}
        >
          {ImageCategories.map((category, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 150,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center'
              }}
            >
              <CardMedia
                component='img'
                height='150'
                image={category.image}
                alt={category.label}
              />
              <CardContent>
                <Typography variant='body1'>{category.label}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Grid>
      {/* rounded carousel */}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <RoundedCarousel items={items} />
        </Box>
      </Grid>
      {/* stunning picks */}
      <Grid
        item
        lg={12}
        md={12}
        sm={11}
        xs={11}
        sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 4 }}
      >
        <Grid
          container
          spacing={1}
          rowGap={2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item lg={11.5} md={12} sm={12} xs={12}>
            <Stack
              direction={'row'}
              alignItems='center'
              width={'100%'}
              sx={{ position: 'relative' }}
            >
              <Divider sx={{ position: 'absolute', left: 0, width: {lg:'40%',md:'40%',sm:'30%',xs:'20%'} }} />
              <Typography sx={{ textAlign: 'center', flex: 1, fontSize: 25 }}>
                STUNNING PICKS
              </Typography>
              <Divider sx={{ position: 'absolute', right: 0, width: {lg:'40%',md:'40%',sm:'30%',xs:'20%'} }} />
            </Stack>
          </Grid>

          {/* New Arrivals */}
          <Grid
            item
            lg={3}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: '90%',
                height: 'auto',
                transition: 'transform 0.3s ease', // Smooth transition for zoom effect
                '&:hover img': {
                  transform: 'scale(1.05)' // Zoom effect on hover
                }
              }}
            >
              <img
                src='https://img.theloom.in/pwa/loom/banners/New-Arrivals-24nov-2024.jpg'
                alt='New Arrivals'
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
            <Typography
              sx={{
                textAlign: 'center',
                marginTop: '8px',
                fontSize: 18,
                fontWeight: 500
              }}
            >
              New Arrivals
            </Typography>
          </Grid>

          {/* Winter Arrivals */}
          <Grid
            item
            lg={3}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: '90%',
                height: 'auto',
                transition: 'transform 0.3s ease', // Smooth transition for zoom effect
                '&:hover img': {
                  transform: 'scale(1.05)' // Zoom effect on hover
                }
              }}
            >
              <img
                src='https://img.theloom.in/pwa/loom/banners/26nov-2024-Winter.jpg'
                alt='Winter Arrivals'
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
            <Typography
              sx={{
                textAlign: 'center',
                marginTop: '8px',
                fontSize: 18,
                fontWeight: 500
              }}
            >
              Winter Arrivals
            </Typography>
          </Grid>

          {/* Velvet Arrivals */}
          <Grid
            item
            lg={3}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: '90%',
                height: 'auto',
                transition: 'transform 0.3s ease', // Smooth transition for zoom effect
                '&:hover img': {
                  transform: 'scale(1.05)' // Zoom effect on hover
                }
              }}
            >
              <img
                src='https://img.theloom.in/pwa/loom/banners/13nov-2024-Velvet.jpg'
                alt='Velvet Arrivals'
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
            <Typography
              sx={{
                textAlign: 'center',
                marginTop: '8px',
                fontSize: 18,
                fontWeight: 500
              }}
            >
              Velvet Arrivals
            </Typography>
          </Grid>

          {/* The Guest List Edit */}
          <Grid
            item
            lg={3}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: '90%',
                height: 'auto',
                transition: 'transform 0.3s ease', // Smooth transition for zoom effect
                '&:hover img': {
                  transform: 'scale(1.05)' // Zoom effect on hover
                }
              }}
            >
              <img
                src='https://img.theloom.in/pwa/loom/banners/27nov-2024-The-guest-list-edit.jpg'
                alt='The Guest List Edit'
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
            <Typography
              sx={{
                textAlign: 'center',
                marginTop: '8px',
                fontSize: 18,
                fontWeight: 500
              }}
            >
              The Guest List Edit
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      

      {/* four image square boxes */}
      <Grid item lg={10} sm={11} md={11} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4} justifyContent='center' sx={{ padding: 4 }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                {/* Background Image */}
                <img
                  //   component="img"
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'brightness(0.8)'
                  }}
                />

                {/* Overlay Card Content */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '80%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: 1,
                    borderRadius: '8px',
                    zIndex: 10,
                    textAlign: 'center',
                    boxShadow: 3,
                    width: '80%'
                  }}
                >
                  <Typography variant='h6' component='div'>
                    {card.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {card.description}
                  </Typography>
                  <Typography
                    component={'a'}
                    href='/'
                    sx={{ p: 0, height: 30 }}
                  >
                    Shop Now
                  </Typography>
                </Box>

                {/* Clickable Action */}
                <CardActionArea
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 5
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* style finder */}
      {/* <Grid item lg={10} xs={11} sm={11} md={12} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
        <Grid
          container
          // spacing={2}
          sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}
        >
          <Paper
            elevation={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              flexDirection: 'column',
              width: '100%',
              pl: 4,
              pb: 4,
              pr: 4
            }}
          >
            <Grid
              item
              lg={5}
              md={5}
              xs={12}
              sx={{
                // backgroundColor: 'gray', // Blue-green background color
                // borderRadius: '0px 0px 60px 60px', // Half-round bottom corners
                pb: 2,
                pt: 1,
                pl: 2,
                pr: 2,
                gap: 1,
                color: 'black',
                // borderTop: 'none', // Remove top border
                // borderLeft: '20px solid #E5E4E2', // Light left border
                // borderRight: '20px solid #E5E4E2', // Light right border
                // borderBottom: '20px solid #E5E4E2', // Light bottom border
                // boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
              }}
            >
              <Typography
                variant='h4'
                align='center'
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 27,
                  pb: 1,pt:2
                }}
              >
                Style Finder
              </Typography>
              <Typography
                sx={{ fontSize: 14, whiteSpace: 'wrap' }}
                align='center'
              >
                Looking for something specific? Let's get you there
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              lg={12}
              container
              justifyContent='center'
              spacing={2}
            >
              {Object.keys(categories).map(category => (
                <Grid item key={category}>
                  <Button
                    variant={
                      selectedCategory === category ? 'contained' : 'outlined'
                    }
                    onClick={() => handleCategoryClick(category as CategoryKey)}
                    sx={{
                      textTransform: 'none',
                      width: 90,
                      color: selectedCategory === category ? 'white' : 'black',
                      bgcolor:
                        selectedCategory === category ? 'teal' : 'inherit',
                      ':hover': {
                        bgcolor:
                          selectedCategory === category ? 'teal' : 'inherit'
                      }
                    }}
                  >
                    {category}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Grid
              container
              spacing={2}
              columnGap={9}
              justifyContent='center'
              alignItems='center'
            >
              {categories[selectedCategory]?.map((item, index) => (
                <Grid
                  item
                  xs={2}
                  sm={1}
                  md={1}
                  lg={1}
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,m:1
                  }}
                  onClick={() =>
                    setSelectedCard({
                      title: item.label,
                      description: '',
                      image: item.image
                    })
                  }
                >
                  <Card
                    sx={{
                      width: 130,
                      border:
                        selectedCard?.image === item.image
                          ? '2px solid #3BD9EB'
                          : 'none'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '100%', // 1:1 aspect ratio
                        overflow: 'hidden'
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={item.image}
                        alt={item.label}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Card>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      marginTop: 1
                    }}
                  >
                    {item.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} container justifyContent='center' spacing={2}>
              {['Most Popular', 'Latest'].map(filter => (
                <Grid item key={filter}>
                  <Button
                    variant='outlined'
                    sx={{
                      textTransform: 'none',
                      width: 140,
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {filter}
                    <KeyboardArrowRightIcon sx={{ ml: 1 }} />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid> */}

      {/* shop the look section */}
      {/* <Grid item lg={12} md={11} sm={12} xs={9} mb={3}>
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: 'Times New Roman, serif',
            fontSize: 30
          }}
        >
          Shop The Look
        </Typography>

        <Box
          width={'100%'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <AnimatedCarousel images={animatedImages} />
        </Box>
      </Grid> */}

      {/* summer breeze first square */}
      <Grid
        item
        lg={10}
        md={11}
        sm={12}
        xs={12}
        mb={3}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid container p={4}>
          <Grid item lg={6} xs={12}>
            <Stack
              sx={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                p: 2
                // pl: { xs: 5, md: 10 }
              }}
            >
              <Typography
                sx={{ fontSize: 38, fontWeight: 800, color: '#35363a' }}
              >
                <span style={{ color: '#808188' }}>SUMMER BREEZE 2024:</span>{' '}
                WHERE STYLE MEETS SUNSHINE
              </Typography>
              <Typography sx={{ color: '#35363a', pr: 1, fontSize: 20 }}>
                Dive into the heart of summer with our "Summer Breeze 2024"
                collection, a refreshing take on seasonal fashion. This line is
                a tribute to the vibrant energy of the sunniest days, featuring
                an array of chic, comfortable pieces that speak to the soul of
                summer.
              </Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  mt: 2,
                  width: { lg: 300, md: 300, xs: '100%' },
                  fontSize: 18,
                  background: 'linear-gradient(to right, #4facfe, #00f2fe)', // Linear gradient
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none', // Prevents uppercase text
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #00c6fb, #005bea)', // Hover effect gradient
                    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
                  }
                }}
              >
                Explore Collection
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src='https://media.istockphoto.com/id/807428516/photo/beautiful-women-in-shopping.jpg?s=612x612&w=0&k=20&c=kE46kKimqPwF1kjoNzioNlOBdp9kDehYw2PqE0Takr8=' // Update with actual image path
              alt='Summer Breeze 2024'
              style={{ width: '90%', height: 'auto', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* payment delivery funds square */}
      <Grid item lg={12} md={12} sm={12} xs={12} mb={3}>
        <Grid
          container
          spacing={3}
          justifyContent='space-around'
          alignItems='center'
        >
          {/* Payment & Delivery */}
          <Grid
            item
            xs={12}
            sm={4}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Stack spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='https://cdn.shopify.com/s/files/1/0825/5533/9035/files/DELIVERY.svg?v=1714802624'
                alt='Payment & Delivery'
                style={{ width: 100, height: 130 }}
              />
              <Typography variant='h6' sx={{fontWeight:550}}>PAYMENT & DELIVERY</Typography>
              <Typography variant='body2' textAlign='center'>
                Free shipping for orders over Rs -1000
              </Typography>
            </Stack>
          </Grid>

          {/* Return & Refund */}
          <Grid
            item
            xs={12}
            sm={4}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Stack spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='https://cdn.shopify.com/s/files/1/0825/5533/9035/files/REFUND.svg?v=1714802624'
                alt='Return & Refund'
                style={{ width: 100, height: 130 }}
              />
              <Typography variant='h6'  sx={{fontWeight:550}} mt={2}>
                RETURN & REFUND
              </Typography>
              <Typography variant='body2' textAlign='center'>
                100% money refund within 6 days
              </Typography>
            </Stack>
          </Grid>

          {/* Quality Support */}
          <Grid
            item
            xs={12}
            sm={4}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Stack spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='https://cdn.shopify.com/s/files/1/0825/5533/9035/files/support.svg?v=1714802624'
                alt='Quality Support'
                style={{ width: 100, height: 120 }}
              />
              <Typography variant='h6' mt={2}  sx={{fontWeight:550}}>
                QUALITY SUPPORT
              </Typography>
              <Typography variant='body2' textAlign='center'>
                Always online feedback 24/7
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      

      {/* <Grid
        item
        lg={11}
        md={12}
        xs={12}
        mb={3}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid
          container
          justifyContent='center'
          sx={{ position: 'relative', backgroundColor: '#f6f6f6' }}
        >
          <Grid item lg={12} md={12} xs={12}>
            <Grid
              container
              justifyContent='center'
              textAlign='center'
              sx={{ position: 'relative', zIndex: 2 }}
            >
              <Grid item xs={12}>
                <Typography
                  fontWeight='500'
                  sx={{
                    mb: 1,
                    mt: 3,
                    fontSize: 28,
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  Get Green Listed With Our GreenCard Loyalty Programm
                </Typography>
              </Grid>

              <Grid
                item
                xs={10}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  component='img'
                  src='https://www.octaveclothing.com/cdn/shop/files/FindNow_0.png?v=1724393394&width=600'
                  alt='Pantaloons Gift Card'
                  sx={{
                    width: { lg: '400px', xs: '100%' },
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </Grid>

              <Grid item xs={12} mb={2}>
                <Typography
                  fontWeight='500'
                  sx={{
                    mb: 1,
                    fontSize: 18,
                    fontStyle: 'italic',
                    fontFamily: '"Playfair Display", serif',
                    color: 'white'
                  }}
                >
                  Welcome to India's most rewarding programm
                </Typography>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: 16,
                    fontFamily: '"Poppins", sans-serif',
                    color: 'white'
                  }}
                >
                  Members of loyalty programm will enjoy unique benifits,
                  including special offers,additional discounts,bonus points{' '}
                  <br /> and customized product information
                </Typography>
                <Button
                  variant='text'
                  sx={{
                    color: 'white',
                    px: 4,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 16
                  }}
                >
                  Read More
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60%',
              backgroundColor: '#8c8c8c', // Dark gray background
              borderTopLeftRadius: '120px',
              borderTopRightRadius: '120px',
              zIndex: 1 // Places it behind the content
            }}
          />
        </Grid>
      </Grid> */}

      {/* <Grid item lg={12} md={12} sm={12} xs={12} mb={5} mt={5} >
        <Grid
          container
          spacing={5}
          sx={{ padding: 2, pb: 5, backgroundColor: '#f6f6f6' }}
        >
          {cardDetails.map((card, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='160'
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent sx={{ flexGrow: 1, mb: 5 }}>
                    <Typography gutterBottom variant='h5' component='div'>
                      {card.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary' }}
                    >
                      {card.description}
                    </Typography>
                    <Collapse
                      in={expandedIndex === index}
                      timeout='auto'
                      unmountOnExit
                    >
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', mt: 1 }}
                      >
                        <strong>Fabric:</strong> {card.fabric} <br />
                        <strong>Color:</strong> {card.color} <br />
                        <strong>Occasion:</strong> {card.occasion}
                      </Typography>
                    </Collapse>
                  </CardContent>
                </CardActionArea>

                <CardActions
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'space-between',
                    padding: 2
                  }}
                >
                  <Button
                    size='small'
                    onClick={() => handleToggleDetails(index)}
                  >
                    {expandedIndex === index ? 'Show Less' : 'More Details'}
                  </Button>
                  <Stack direction={'row'}>
                    <IconButton color='primary'>
                      <Share />
                    </IconButton>
                    <IconButton color='error'>
                      <Favorite />
                    </IconButton>
                    <IconButton color='primary'>
                      <ShoppingCart />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid> */}
    </Grid>
  )
}

export default Dashboard
