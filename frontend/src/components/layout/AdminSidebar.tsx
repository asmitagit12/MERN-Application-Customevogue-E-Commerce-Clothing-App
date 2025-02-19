import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
 
  Typography,

  useMediaQuery,
  Stack,
  Box
} from '@mui/material'
import { Home, Settings } from '@mui/icons-material' // Home and Settings icons
import ExpandLess from '@mui/icons-material/ExpandLess' // Icon for collapsing submenus
import ExpandMore from '@mui/icons-material/ExpandMore' // Icon for expanding submenus
import { Inventory2,  Person } from '@mui/icons-material'
import logo from '../../assets/logo.svg'

interface IMenuItem {
  name: string
  label: string
  href: string
  icon?: React.ReactNode
  submenu?: IMenuItem[]
}

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})
  const matches = useMediaQuery('(max-width:600px)')
  const menus: IMenuItem[] = [
    {
      name: 'Dashboard',
      label: 'Main',
      href: '/admin',
      icon: <Home sx={{ fontSize: 20, p: 0, m: 0 }} />
      // submenu: []
    },
    {
      name: 'Products',
      label: 'Manage Product',
      href: '/admin/products',
      icon: <Inventory2 sx={{ fontSize: 20, p: 0, m: 0 }} />,
      submenu: [
        {
          name: 'Products',
          label: 'Products',
          href: '/admin/products'
        },
        {
          name: 'Category',
          label: 'Categories',
          href: '/admin/category'
        }
      ]
    },

    {
      name: 'Users',
      label: 'Manage Users',
      href: '/admin/users',
      icon: <Person sx={{ fontSize: 20, p: 0, m: 0 }} />,
      submenu: [
        {
          name: 'User List',
          label: 'User List',
          href: '/admin/users'
        }
      ]
    },
    {
      name: 'Settings',
      label: 'Settings',
      href: '/settings',
      icon: <Settings sx={{ fontSize: 20, p: 0, m: 0 }} />
    }
  ]

  const uniqueLabels = Array.from(new Set(menus.map(menu => menu.label)))

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }))
  }

  return (
    <Drawer
      id='drawer'
      variant={matches ? 'temporary' : isOpen ? 'permanent' : 'temporary'}
      open={isOpen}
      onClose={toggleSidebar}
      ModalProps={{ keepMounted: true }} // Improves performance on mobile
      sx={{
        '& .MuiDrawer-paper': {
          width: 210,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5'
        }
      }}
    >
      <Box
        sx={{
          height: 53,
          borderBottom: '1px solid rgb(200, 209, 218)',
          display: 'flex',
          justifyContent: 'center',

          alignItems: 'center'
        }}
      >
        <Box
          component={Link}
          to='/admin'
          sx={{
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center', // Ensure the logo is vertically aligned

            img: {
              width: { md: 160, xs: 100 },
              height: 'auto'
            }
          }}
        >
          <img src={logo} alt='Logo' />
          <Typography
            sx={{
              color: 'gray',
              fontSize: 9,
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            Craft Your Fashion, Define Your Vogue
          </Typography>
        </Box>
      </Box>

      <List>
        {uniqueLabels.map((label, index) => (
          <React.Fragment key={label}>
            {label && (
              <Typography
                variant='caption'
                sx={{ ml: 2, mt: index > 0 ? 2 : 0, mb: 1, color: '#B2BEB5' }}
              >
                {label}
              </Typography>
            )}

            {menus
              .filter(menu => menu.label === label)
              .map(menu => (
                <React.Fragment key={menu.name}>
                  <ListItem
                    button
                    onClick={() => toggleSubmenu(menu.name)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between' // Ensure space between left and right content
                    }}
                  >
                    <Stack
                      direction='row'
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ListItemIcon
                        sx={{ minWidth: 27 /* Ensures proper spacing */ }}
                      >
                        {menu.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={menu.name}
                        sx={{ '& span': { fontSize: 14 } }}
                      />
                    </Stack>
                    {menu.submenu &&
                      (openSubmenus[menu.name] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItem>

                  {menu.submenu && (
                    <Collapse
                      in={openSubmenus[menu.name]}
                      timeout='auto'
                      unmountOnExit
                    >
                      <List component='div' disablePadding>
                        {menu.submenu.map(subItem => (
                          <ListItem
                            key={subItem.name}
                            button
                            component={NavLink}
                            to={subItem.href}
                            // onClick={toggleSidebar}
                            sx={{ pl: 4, pt: 0.5, pb: 0.5 }}
                          >
                            <ListItemText
                              primary={subItem.name}
                              sx={{ '& span': { fontSize: 14 } }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default AdminSidebar
