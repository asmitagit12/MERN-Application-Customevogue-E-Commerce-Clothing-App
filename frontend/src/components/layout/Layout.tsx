import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, IconButton, useMediaQuery, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from './Header';
import Footer from './Footer';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const ScrollToTopButton: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={showScroll}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </Zoom>
  );
};

const UserLayout: React.FC = () => {
  const headerHeight = 40; // Estimated height of your header in px

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      {/* Header */}
      <Box sx={{ height: `${headerHeight}px`, width: '100%' }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Box component="main" flexGrow={1} width="100%" mt={3}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box>
        <Footer />
      </Box>

      {/* Scroll-to-top button */}
      <ScrollToTopButton />
    </Box>
  );
};

const AdminLayout: React.FC = () => {
  const sidebarWidth = 200; // Adjust this to your sidebar's width
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsSidebarOpen(matches); // Automatically open sidebar for larger screens
  }, [matches]);

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      {/* Admin Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { lg: sidebarWidth, md: sidebarWidth, sm: sidebarWidth, xs: 0 },
            flexShrink: 0, // Prevent the sidebar from shrinking
            height: '100%', // Make sure sidebar takes full height
          }}
        >
          <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Ensure content takes remaining space
            pl: 2.5,
            pr: 2,
            transition: 'margin-left 0.3s ease', // Smooth transition for sidebar toggle
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Scroll-to-top button */}
      <ScrollToTopButton />
    </Box>
  );
};

export { UserLayout, AdminLayout };
