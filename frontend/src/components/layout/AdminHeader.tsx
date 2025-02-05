import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AdminMenu from '../AdminMenu'

interface AdminHeaderProps {
  toggleSidebar: () => void
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const matches = useMediaQuery('(max-width:600px)')
  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      sx={{ height: 54, borderBottom: '1px solid rgb(200, 209, 218)' }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: matches ? 'space-between' : 'flex-end',
          alignItems: 'center'
        }}
      >
        {matches && (
          <Stack
            direction={'row'}
            spacing={0.2}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {matches && location.pathname === '/admin' && (
              <Typography sx={{ pl: 1, fontWeight: 600, fontSize: 19 }}>
                Dashboard
              </Typography>
            )}
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        )}
        {!matches && <AdminMenu />}
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
