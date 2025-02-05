import React from 'react'
import { Box } from '@mui/material'
import UserNavigationBar from '../../components/UserNavigationBar'
import { Outlet } from 'react-router-dom'

const AccountLayout: React.FC = () => {
  return (
    // <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        p: 2,
        flexWrap: 'wrap', height: 'auto'
      }}
    >
      <UserNavigationBar />

      {/* Right Content */}
      <Box sx={{ flex: 1, p: 1, overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AccountLayout
