import React from 'react';
import {
  Paper,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  linkText?: string;
  secondaryText?: string;
}

interface MenuSection {
  title: string;
  icon?: React.ReactNode;
  items: MenuItem[];
}

const menuData: MenuSection[] = [
  {
    title: 'My Orders',
    icon: <Inventory2Icon color="primary" />,
    items: [
      { title: 'Order History', icon: <Inventory2Icon color="primary" />, linkText: '/orders' },
    ],
  },
  {
    title: 'Account Settings',
    icon: <PersonIcon color="secondary" />,
    items: [
      { title: 'Profile Information', icon: <PersonIcon color="secondary" />, linkText: '/account' },
      { title: 'Manage Addresses', icon: <PersonIcon color="secondary" />, linkText: '/account/addresses' },
      // { title: 'PAN Card Information', icon: <PersonIcon color="secondary" />, linkText: '/account/pan-info' },
    ],
  },
  // {
  //   title: 'Payments',
  //   icon: <AccountBalanceWalletIcon color="success" />,
  //   items: [
  //     { title: 'Gift Cards', secondaryText: '₹0', icon: <AccountBalanceWalletIcon color="success" />, linkText: '/payments/gift-cards' },
  //     { title: 'Saved UPI', icon: <AccountBalanceWalletIcon color="success" />, linkText: '/payments/saved-upi' },
  //     { title: 'Saved Cards', icon: <AccountBalanceWalletIcon color="success" />, linkText: '/payments/saved-cards' },
  //   ],
  // },
  {
    title: 'My Stuffs',
    icon: <AccountBoxIcon color="success" />,
    items: [
      // { title: 'My Coupons', secondaryText: '₹0', icon: <AccountBalanceWalletIcon color="success" />, linkText: '/my-stuffs/coupons' },
      { title: 'My Wishlist', icon: <AccountBalanceWalletIcon color="success" />, linkText: '/account/wishlist' },
      { title: 'My Notifications', icon: <AccountBalanceWalletIcon color="success" />, linkText: '/account/notifications' },
    ],
  },
];

const UserNavigationBar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string | undefined) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        width: '100%',
        maxWidth: 250,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        bgcolor: 'background.paper',
        '@media (max-width: 600px)': {
          width: '100%',
          maxWidth: 'none',
          borderRadius: 0,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', color: 'white', fontSize: 24 }}>
          AP
        </Avatar>
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
          Asmita Patil
        </Typography>
      </Box>

      <List>
        {menuData.map((section, index) => (
          <React.Fragment key={index}>
            {section.icon && (
              <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
                {section.icon}
                <Typography variant="subtitle2" color="text.secondary" sx={{ pl: 1, fontWeight: 'bold' }}>
                  {section.title}
                </Typography>
              </Stack>
            )}
            {section.items.map((item, idx) => (
              <ListItem
                disablePadding
                button
                sx={{ pl: 4, pt: 0.5, pb: 0.5 }}
                key={idx}
                onClick={() => handleNavigation(item.linkText)}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            ))}
            {index < menuData.length - 1 && <Divider sx={{ my: 2 }} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default UserNavigationBar;
