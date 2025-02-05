import React, { useState, MouseEvent } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import logo from '../../assets/logo.svg';
import UserMenu from '../UserMenu';

type SubMenuItem = {
  category: string;
  items: string[];
};

type MenuItem = {
  name: string;
  path: string;
  subMenu: SubMenuItem[];
};

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<{
    menuName: string;
    target: HTMLElement;
  } | null>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenuItem[]>([]);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      name: 'HOME',
      path: '/',
      subMenu: [
        
      ]
    },
    {
      name: 'COLLECTIONS',
      path: '/collection',
      subMenu: [
       
      ]
    },

    {
      name: 'CONTACT US',
      path: '/contact',
      subMenu: [
        

      ]
    },

    {
      name: 'ABOUT US',
      path: '/about',
      subMenu: []
    }


  ]
  // const menuItems: MenuItem[] = [
  //   {
  //     name: 'WOMEN',
  //     path: '/women',
  //     subMenu: [
  //       {
  //         category: 'Indianwear',
  //         items: [
  //           'Kurtas, Kurtis & Tops',
  //           'Ethnic Dresses',
  //           'Bottomwear',
  //           'Ethnic Sets',
  //           'Sarees & Blouses',
  //           'Duppatas & Shawls',
  //           'Dress Material',
  //           'Accessories'
  //         ]
  //       },
  //       {
  //         category: 'Westernwear',
  //         items: [
  //           'Topwear',
  //           'Dresses & Jumpsuits',
  //           'Jeans & Leggings',
  //           'Shorts & Skirts',
  //           'Trousers & Pants',
  //           'Jackets & Shrugs',
  //           'Activewear & Sportswear',
  //           'Winterwear',
  //           'Accessories'
  //         ]
  //       },
  //       {
  //         category: 'Lingerie & Nightwear',
  //         items: [
  //           'Bras',
  //           'Briefs',
  //           'Shapewear',
  //           'Sleepwear & Loungewear',
  //           'Swimwear',
  //           'Sets'
  //         ]
  //       }

  //     ]
  //   },
  //   {
  //     name: 'MEN',
  //     path: '/men',
  //     subMenu: [
  //       {
  //         category: 'Top Wear',
  //         items: [
  //           'Shirts',
  //           'T-Shirts',
  //           'Sweatshirts',
  //           'Jackets',
  //           'Blazers for Men',
  //           'Sweaters',
  //           'Suits'
  //         ]
  //       },
  //       {
  //         category: 'Bottom Wear',
  //         items: ['Trousers', 'Jeans', 'Shorts', 'Track Pants']
  //       },
  //       {
  //         category: 'Ethnic Wear',
  //         items: [
  //           'Kurtas',
  //           'Kurta Sets',
  //           'Waistcoats',
  //           'Pyjamas',
  //           'Churidar',
  //           'Salwars'
  //         ]
  //       },
  //       {
  //         category: 'Accessories',
  //         items: ['Sunglasses', 'Belts', 'Wallets', 'Accessories', 'Socks']
  //       },
  //       {
  //         category: 'Sports and Activewear',
  //         items: ['Track Pants', 'Shorts', 'T-Shirts', 'Jackets', 'Track Suits']
  //       },
  //       {
  //         category: 'Footwear',
  //         items: [
  //           'Casual Shoes',
  //           'Sport Shoes',
  //           'Formal Shoes',
  //           'Flip Flops',
  //           'Sandals',
  //           'Boots'
  //         ]
  //       },
  //       {
  //         category: 'Innerwear and Sleepwear',
  //         items: [
  //           'Track Pants',
  //           'Vests',
  //           'Briefs',
  //           'Boxers',
  //           'Trunks',
  //           'Nightwear Sets'
  //         ]
  //       },

  //     ]
  //   },

  //   {
  //     name: 'KIDS',
  //     path: '/kids',
  //     subMenu: [
  //       {
  //         category: 'Boys',
  //         items: [
  //           'Topwear',
  //           'Bottomwear',
  //           'Innerwear & Nightwear',
  //           'Winterwear',
  //           'Indianwear',
  //           'Co-Ordinates',
  //           'Suits & Blazers'
  //         ]
  //       },
  //       {
  //         category: 'Girls',
  //         items: [
  //           'Topwear',
  //           'Bottomwear',
  //           'Dresses',
  //           'Jumpsuit & Dunagrees',
  //           'Innerwear & Nightwear',
  //           'Winterwear',
  //           'Indianwear',
  //           'Co-Ordinates',
  //           'Accessories'
  //         ]
  //       },
  //       {
  //         category: 'Infants',
  //         items: [
  //           'Topwear',
  //           'Bottomwear',
  //           'Dresses & Jumpsuits',
  //           'Sleepsuits & Rompers',
  //           'Innerwear & Nightwear',
  //           'Winterwear',
  //           'Indianwear',
  //           'Co-Ordinates',
  //           'Feeding Time',
  //           'Accessories',
  //           'Travel Time'
  //         ]
  //       }

  //     ]
  //   },

  //   {
  //     name: 'About Us',
  //     path: '/collection',
  //     subMenu: []
  //   }


  // ]



  const handleMouseEnter = (event: MouseEvent<HTMLElement>, item: MenuItem) => {
    if (item.subMenu.length > 0) {
      setAnchorEl({ menuName: item.name, target: event.currentTarget });
      setCurrentSubMenu(item.subMenu);
    }
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleClick = (item: MenuItem) => {
    if (item.subMenu.length === 0) {
      navigate(item.path); // Navigate directly if no submenu
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <Box
        sx={{
          backgroundColor: '#E5E4E2',
          px: 2,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 15,
          height: 25,
        }}
      >
        <Marquee gradient={false} speed={50}>
          <Typography
            sx={{
              color: '#708090',
              pt: 0.5,
              pb: 0.5,
              display: 'inline-block',
              ml: 2,
              mr: 2,
              fontSize: 13,
            }}
          >
            Black Friday Sale has started! Flat 50% OFF on the season's
            must-haves + ₹3000 cashback. SHOP NOW!
          </Typography>
        </Marquee>
      </Box>

      {/* Header Section */}
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          top: '26px', // Adjust based on the height of the announcement bar
          px: 2,
          zIndex: 20, // Ensure it is above the content
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              img: {
                height: { xs: '26px', md: '40px' }, // Apply media queries for height
              },
            }}
          >
            <img src={logo} alt="Logo" />
          </Box>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={8}
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            {menuItems.map((item) => (
              <Typography
                key={item.name}
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(item)}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: '500',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main', cursor: 'pointer' },
                }}
              >
                {item.name}
                {item.subMenu.length > 0 && (
                  <Popper
                    open={anchorEl?.menuName === item.name}
                    anchorEl={anchorEl?.target}
                    placement="bottom"
                    disablePortal
                    modifiers={[
                      {
                        name: 'offset',
                        options: { offset: [0, 10] },
                      },
                    ]}
                    onMouseEnter={() => setAnchorEl(anchorEl)} // Prevent closing when hovering over the submenu
                    onMouseLeave={handleMouseLeave} // Close when the user leaves the submenu
                    sx={{ zIndex: 10 }}
                  >
                    <Paper
                      elevation={3}
                      sx={{ p: 2, display: 'flex', gap: 2, width: 'auto' }}
                    >
                      {currentSubMenu.map((category) => (
                        <Box key={category.category}>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: 14,
                              mb: 1,
                            }}
                          >
                            {category.category}
                          </Typography>
                          <List dense>
                            {category.items.map((subItem) => (
                              <ListItem
                                key={subItem}
                                sx={{
                                  p: 0,
                                  '&:hover': {
                                    color: 'primary.main',
                                    cursor: 'pointer',
                                  },
                                }}
                                onClick={() =>
                                  navigate(`/${subItem.toLowerCase()}`)
                                }
                              >
                                <ListItemText primary={subItem} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ))}
                    </Paper>
                  </Popper>
                )}
              </Typography>
            ))}
          </Stack>
          {/* Search and Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search"
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: 300,
                bgcolor: 'white',
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />,
              }}
            /> */}
            <IconButton
              color="inherit"
              // sx={{ display: { xs: 'flex', md: 'none' }, p: 0, m: 0 }}
            >
              <SearchIcon sx={{fontSize:28}}/>
            </IconButton>
            <UserMenu />
            <IconButton
              color="inherit"
              sx={{ p: 0, m: 0 }}
              onClick={() => navigate('/cart')}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 2, py: 1, borderBottom: '1px solid #ddd' }}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.name}
                button
                component={Link}
                to={item.path}
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
