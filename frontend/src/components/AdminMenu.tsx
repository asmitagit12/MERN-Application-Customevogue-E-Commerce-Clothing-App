import React, { useState } from 'react'
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContext'

interface MenuItemConfig {
  label: string
  icon: React.ReactNode
  action: () => void
}

const AdminMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuthContext()

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('isAuth')
    navigate('/auth/signin')
  }

  const menuItems: MenuItemConfig[] = [
    {
      label: 'My Profile',
      icon: <AccountCircleIcon fontSize='small' />,
      action: () => navigate('/admin/account')
    },
    // {
    //   label: 'Notifications',
    //   icon: <NotificationsIcon fontSize='small' />,
    //   action: () => navigate('/account/notifications')
    // },
    {
      label: 'Settings',
      icon: <SettingsIcon fontSize='small' />,
      action: () => navigate('/admin/settings')
    }
  ]

  return (
    <>
      {isAuthenticated ? (
        <Button
          color='inherit'
          sx={{
            p: 0.5,
            m: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={event => setAnchorEl(event.currentTarget)}
        >
          <AccountCircleRoundedIcon sx={{ mr: 1 }} />
          Asmita
        </Button>
      ) : (
        <IconButton
          color='inherit'
          sx={{ p: 0, m: 0 }}
          onClick={() => navigate('/auth/signin')}
        >
          <AccountCircleRoundedIcon />
        </IconButton>
      )}
      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }
          }}
        >
          {menuItems.map(({ label, icon, action }) => (
            <MenuItem
              key={label}
              onClick={() => {
                handleMenuClose()
                action()
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ pt: 0, pb: 0 }}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default AdminMenu
