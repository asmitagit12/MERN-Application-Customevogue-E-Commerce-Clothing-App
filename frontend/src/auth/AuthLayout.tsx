import React from 'react'
import { Grid, Box, Paper, Typography } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo.svg'


const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: { lg: '90vh', xs: '80vh',md:'90vh',sm:'90vh' }, // Ensures full height of the screen
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 5
      }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{
          width: '100%',
          height: { lg: '95vh', xs: '75vh' },
          padding: 0,
          m: 0
        }}
      >
        <Grid
          item
          lg={4} // Adjust width on larger screens
          md={5}
          sm={10}
          xs={11}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              borderRadius: '16px',
              // boxShadow: 3,
              padding: 3,
              flexDirection: 'row', // Align form and image horizontally
              minHeight: '380px', // Minimum height to ensure form is visible
              overflow: 'hidden'
            }}
          >
            {/* Left side: Children (form content) */}
            <Grid
              item
              xs={12}
              sm={12}
              rowGap={2}
              pr={0.5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // borderRight: { md: '1px solid #E5E4E2', xs: 'none', sm: 'none' }
              }}
            >
              <Box
                component={Link}
                to='/'
                sx={{
                  textDecoration: 'none',
                  img: {
                    height: '20px' // Apply media queries for height
                  }
                }}
              >
                <img src={logo} alt='Logo' />
                <Typography
                  sx={{
                    color: 'gray',
                    fontSize: 14,
                    fontFamily: '"Poppins", sans-serif'
                  }}
                >
                  Craft Your Fashion, Define Your Vogue
                </Typography>
              </Box>
              <Outlet />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AuthLayout
