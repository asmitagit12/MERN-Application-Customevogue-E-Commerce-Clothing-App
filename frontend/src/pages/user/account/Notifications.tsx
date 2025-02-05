import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  title: string;
  message: string;
}

const notifications: Notification[] = []; // Replace with your notifications array

const Notifications: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: 800,
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        p: { xs: 2, sm: 3, md: 4 },
        m: 'auto',
        mt: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {notifications.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: { xs: 3, sm: 4 },
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/047/468/654/small/no-notifications-empty-state-illustration-free-vector.jpg"
            alt="No Notifications"
            style={{ width: '100%', maxWidth: 150, height: 'auto' }}
          />
          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: 16, sm: 18, md: 20 },
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 550,
            }}
          >
            No Notifications Yet!
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              mt: 1,
              fontSize: { xs: 14, sm: 16 },
              textAlign: { xs: 'center', sm: 'justify' },
            }}
          >
            Stay tuned! You’ll see your notifications here soon.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              px: { xs: 3, sm: 4 },
              py: 1.5,
              borderRadius: '50px',
              background: 'linear-gradient(to right, #4facfe, #00f2fe)',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              fontSize: { xs: 12, sm: 14 },
              '&:hover': {
                background: 'linear-gradient(to right, #00c6fb, #005bea)',
                boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => navigate('/')} // Adjust as needed
          >
            Explore More
          </Button>
        </Box>
      ) : (
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                '&:last-child': { borderBottom: 'none' },
                px: { xs: 1, sm: 2 },
              }}
            >
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  fontSize: { xs: 14, sm: 16 },
                  color: 'text.primary',
                }}
                secondaryTypographyProps={{
                  fontSize: { xs: 12, sm: 14 },
                  color: 'text.secondary',
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notifications;
