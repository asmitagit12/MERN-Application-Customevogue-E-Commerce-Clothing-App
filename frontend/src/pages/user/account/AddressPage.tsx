
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
  IconButton,
  Stack
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  createAddress,
  getUserAddresses,
  deleteAddress,
  updateAddress,
  getAddressById
} from '../../../services/user/addressService'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  streetAddress: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pinCode: z.string().min(6, 'Pincode must be 6 digits').max(6, 'Pincode must be 6 digits'),
  country: z.string().min(1, 'Country is required'),
  addressType: z.enum(['HOME', 'WORK', 'OTHER'], { errorMap: () => ({ message: 'Address type is required' }) })
})

type AddressFormData = z.infer<typeof addressSchema>

const AddressPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const user = useSelector((state: RootState) => state.auth.user)
  const userID = user?._id as string

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema)
  })

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userID) return
      setLoading(true)
      try {
        const response = await getUserAddresses(userID)
        setAddresses(response.data)
      } catch (error) {
        console.error("Failed to fetch addresses", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [userID])

  // Menu functions
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor(event.currentTarget)
    setSelectedAddressId(id)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
    setSelectedAddressId(null)
  }

  const handleEdit = async () => {
    if (selectedAddressId !== null) {
      try {
        const response = await getAddressById(selectedAddressId)
        reset(response.data) // Populate form with existing address
        setShowForm(true)
      } catch (error) {
        toast.error("Failed to fetch address for editing")
      }
    }
    handleMenuClose()
  }

  const handleDelete = async () => {
    if (selectedAddressId !== null) {
      try {
        await deleteAddress(selectedAddressId)
        setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== selectedAddressId))
        toast.success('Address deleted successfully')
      } catch (error) {
        console.error("Failed to delete address", error)
        toast.error('An error occurred while deleting the address')
      }
    }
    handleMenuClose()
  }

  const onSubmit = async (data: AddressFormData) => {
    try {
      if (selectedAddressId) {
        // Update address
        await updateAddress(selectedAddressId, data)
        toast.success('Address Updated!')
      } else {
        // Create new address
        await createAddress({ ...data, userId: userID })
        toast.success('Address Created!')
      }
      setShowForm(false)

      const response = await getUserAddresses(userID)
      setAddresses(response.data)
      reset()
    } catch (error) {
      toast.error('An error occurred while submitting the address')
    }
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
      <Stack direction={'row'} sx={{display:'flex',justifyContent:'space-between'}}>

      {/* Title */}
      <Typography sx={{fontSize:21}} gutterBottom>
        Manage Addresses
      </Typography>

      {/* Add New Address Button */}
      {!showForm && (
        <Button
          variant='outlined'
          size='small'
          sx={{height:30}}
          startIcon={<span style={{ fontSize: 18 }}>+</span>}
          onClick={() => setShowForm(true)}
        >
          ADD A NEW ADDRESS
        </Button>
      )}
      </Stack>

      {/* Form Section */}
      {showForm && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography sx={{fontSize:21,pb:1}} >
            Add a New Address
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      size="small"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="streetAddress"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Street Address"
                      size="small"
                      fullWidth
                      error={!!errors.streetAddress}
                      helperText={errors.streetAddress?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      size="small"
                      fullWidth
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="State"
                      size="small"
                      fullWidth
                      error={!!errors.state}
                      helperText={errors.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="pinCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Pincode"
                      size="small"
                      fullWidth
                      error={!!errors.pinCode}
                      helperText={errors.pinCode?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Country"
                      size="small"
                      fullWidth
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Address Type */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Address Type
              </Typography>
              <Controller
                name="addressType"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="HOME" control={<Radio />} label="Home" />
                    <FormControlLabel value="WORK" control={<Radio />} label="Work" />
                    <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
                  </RadioGroup>
                )}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                type="submit"
              >
                SAVE
              </Button>
              <Button variant="outlined" onClick={() => {
                setShowForm(false)
                setSelectedAddressId(null)
              }}>
                CANCEL
              </Button>
            </Box>
          </form>
        </Paper>
      )}
      {/* Existing Addresses */}
      <Box sx={{ mt: 4 }}>
        {addresses.map(address => (
          <Paper key={address._id} sx={{ p: 2, mb: 2, position: 'relative' }}>
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={e => handleMenuOpen(e, address._id)}
            >
              <MoreVertIcon />
            </IconButton>

            {/* Address Content */}
            <Typography variant="body2" sx={{ backgroundColor: '#f5f5f5', width: 50, textAlign: 'center' }}>
              {address.addressType}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 550,pt:1,pb:0.5 }}>
              {address.name}
            </Typography>
            <Typography variant="body1">
              {address.streetAddress}, {address.city},{address.country}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {address.state} - <span style={{ fontWeight: 550 }}>{address.pinCode}</span>
            </Typography>
          </Paper>
        ))}
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ fontSize: 18, mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ fontSize: 18, mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AddressPage


