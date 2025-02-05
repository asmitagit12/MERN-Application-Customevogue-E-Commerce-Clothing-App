import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
 
  Menu,
  IconButton
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const AddressPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  // Menu state
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  )

  // Dummy array for existing addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'HOME',
      name: 'Asmita Ashok Patil',
      mobile: '9823400414',
      addressLine: 'Main road near Marathi school, Malage Khurd',
      city: 'Kolhapur District',
      state: 'Maharashtra',
      pincode: '416235'
    },
    {
      id: 2,
      type: 'WORK',
      name: 'Ashok Patil',
      mobile: '9012345678',
      addressLine: 'Tech Park, Hinjewadi Phase 1',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057'
    }
  ])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setMenuAnchor(event.currentTarget)
    setSelectedAddressId(id)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
    setSelectedAddressId(null)
  }

  const handleEdit = () => {
    alert(`Edit address with ID: ${selectedAddressId}`)
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedAddressId !== null) {
      const updatedAddresses = addresses.filter(
        address => address.id !== selectedAddressId
      )
      setAddresses(updatedAddresses)
      alert(`Deleted address with ID: ${selectedAddressId}`)
    }
    handleMenuClose()
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography variant='h5' gutterBottom>
        Manage Addresses
      </Typography>

      {/* Add New Address Button */}
      {!showForm && (
        <Button
          variant='outlined'
          startIcon={<span style={{ fontSize: 18 }}>+</span>}
          onClick={() => setShowForm(true)}
        >
          ADD A NEW ADDRESS
        </Button>
      )}

      {/* Form Section */}
      {showForm && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant='h6' gutterBottom>
            Add a New Address
          </Typography>

          {/* Use Current Location */}
          <Button variant='contained' color='primary' sx={{ mb: 3 }}>
            Use my current location
          </Button>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label='Name' size='small' fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='10-digit mobile number' size='small' fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Pincode' size='small' fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Locality' size='small' fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Address (Area and Street)' size='small' fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='City/District/Town' size='small' fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='State' size='small' select fullWidth required>
                {/* Add options for states */}
                <option value=''>--Select State--</option>
                <option value='Maharashtra'>Maharashtra</option>
                <option value='Karnataka'>Karnataka</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Landmark (Optional)' size='small' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Alternate Phone (Optional)' size='small' fullWidth />
            </Grid>
          </Grid>

          {/* Address Type */}
          <Box sx={{ mt: 3 }}>
            <Typography variant='subtitle1' gutterBottom>
              Address Type
            </Typography>
            <RadioGroup row>
              <FormControlLabel value='home' control={<Radio />} label='Home' />
              <FormControlLabel value='work' control={<Radio />} label='Work' />
            </RadioGroup>
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant='contained'
              color='primary'
              sx={{ mr: 2 }}
              onClick={() => alert('Address Saved')}
            >
              SAVE
            </Button>
            <Button variant='outlined' onClick={() => setShowForm(false)}>
              CANCEL
            </Button>
          </Box>
        </Paper>
      )}

      {/* Existing Addresses */}
      <Box sx={{ mt: 4 }}>
        {addresses.map(address => (
          <Paper key={address.id} sx={{ p: 2, mb: 2, position: 'relative' }}>
            {/* MoreVert Icon */}
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={e => handleMenuOpen(e, address.id)}
            >
              <MoreVertIcon />
            </IconButton>

            {/* Address Content */}
            <Typography variant='subtitle1' gutterBottom>
              {address.type}
            </Typography>
            <Typography variant='body1'>
              {address.name} {address.mobile}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {address.addressLine}, {address.city}, {address.state} -{' '}
              {address.pincode}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          sx={{
            px: 1.5, // Padding left and right
            py: 0.5, // Padding top and bottom
            m: 0.5 // Margin
          }}
          onClick={handleEdit}
        >
          <EditIcon sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant='body2' sx={{ fontSize: 14 }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{
            px: 1.5,
            py: 0.5,
            m: 0.5
          }}
          onClick={handleDelete}
        >
          <DeleteIcon sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant='body2' sx={{ fontSize: 14 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AddressPage
