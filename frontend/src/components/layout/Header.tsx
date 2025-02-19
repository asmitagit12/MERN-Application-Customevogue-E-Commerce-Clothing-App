import React, { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,

  Stack,

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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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

  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.products)

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
          height: '48px',
          top: '26px', // Adjust based on the height of the announcement bar
          display: 'flex',
          justifyContent: 'center',
          zIndex: 20, // Ensure it is above the content
        }}
      >
        <Toolbar
          sx={{
            // height:'48px',
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
                height: { xs: '26px', md: '28px' }, // Apply media queries for height
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
                onClick={() => navigate(item.path)} // Navigate to the item's path
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: '500',
                  fontSize: 13,
                  '&:hover': { color: 'primary.main', cursor: 'pointer' },
                }}
              >
                {item.name}
              </Typography>

            ))}
          </Stack>
          {/* Search and Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

            <IconButton
              color="inherit"
            // sx={{ display: { xs: 'flex', md: 'none' }, p: 0, m: 0 }}
            >
              <SearchIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <UserMenu />
            <IconButton
              color="inherit"
              sx={{ p: 0, m: 0 }}
              onClick={() => navigate('/cart')}
            >
              <Badge
                badgeContent={cartItems.length} // Display the number of items in the cart
                color="error" // This will show the badge with a red background
                max={99} // Max number of items to show (e.g., 99+ if the count exceeds this number)
              >
                <ShoppingCartIcon />
              </Badge>
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
