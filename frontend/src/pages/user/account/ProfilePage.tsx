import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Paper,
  IconButton
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { getUserProfile, updateUserProfile } from '../../../services/user/userService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import toast from 'react-hot-toast'

// import { getUserProfile, updateUserProfile } from '../../api/userAPI' // Import API functions

// Define the validation schema using Zod
const schema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email is too long'),
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 characters')
    .max(15, 'Mobile number is too long')
})

type FormData = z.infer<typeof schema>

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profilePic, setProfilePic] = useState<string>(
    'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid'
  ) // Default placeholder image

  const user = useSelector((state: RootState) => state.auth.user)
  // Assume the user ID is retrieved from context or props
  const userId = user?._id // Replace with actual user ID from context or authentication

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: ''
    }
  })

  // Fetch user data when the component mounts
  useEffect(() => {
    if(userId){

      const fetchUserProfile = async () => {
        try {
          const res = await getUserProfile(userId)
          const userData = res.data
          // Set form values based on the user data received
          setValue('firstName', userData.firstName)
          setValue('lastName', userData.lastName)
          setValue('email', userData.email)
          setValue('mobile', userData.mobile)
          // You can also set the profile picture if it's part of the user data
          // setProfilePic(userData.profilePic || 'https://via.placeholder.com/150')
        } catch (error) {
        }
      }
  
      fetchUserProfile()
    }else{
    }
  }, [userId, setValue])

  const onSubmit = async (data: FormData) => {
    if (userId) {
      try {
        await updateUserProfile(userId, data)
        toast.success('Profile updated successfully')
      } catch (error) {
        toast.error('Error updating user profile')
      }
    } else {
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleProfilePicChange = () => {
    // Simulating profile picture change
    const newPic =
      prompt('Enter image URL') || 'https://via.placeholder.com/150'
    setProfilePic(newPic)
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Paper sx={{ padding: '24px', borderRadius: '8px', boxShadow: 3 }} elevation={3}>
        <Box display='flex' flexDirection='column' alignItems='flex-start' marginBottom={3}>
          <Box
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 3,
              backgroundColor: '#ddd',
              position: 'relative'
            }}
          >
            <img src={profilePic} alt='Profile' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <IconButton
              onClick={handleProfilePicChange}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 25,
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': { backgroundColor: '#1565c0' },
                boxShadow: 2,
                zIndex: 2
              }}
            >
              <CameraAltIcon fontSize='small' sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>

        <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', color: '#333', pb: 1 }}>
          Personal Information
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item lg={6} xs={12} md={6}>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='First Name'
                    variant='outlined'
                    size='small'
                    fullWidth
                    disabled={!isEditing}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
                  />
                )}
              />
            </Grid>

            <Grid item lg={6} xs={12} md={6}>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Last Name'
                    variant='outlined'
                    fullWidth
                    size='small'
                    disabled={!isEditing}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
                  />
                )}
              />
            </Grid>

            <Grid item lg={6} xs={12} md={6}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    variant='outlined'
                    fullWidth
                    size='small'
                    disabled
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
                  />
                )}
              />
            </Grid>

            <Grid item lg={6} xs={12} md={6}>
              <Controller
                name='mobile'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Mobile'
                    variant='outlined'
                    fullWidth
                    size='small'
                    disabled={!isEditing}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
                  />
                )}
              />
            </Grid>

            <Grid item lg={12} xs={12}>
              <Box display='flex' justifyContent='flex-end' gap={2}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={!isEditing}
                  sx={{
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant='outlined'
                  onClick={handleEdit}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    color: isEditing ? 'inherit' : '#1976d2',
                    borderColor: isEditing ? 'inherit' : '#1976d2',
                    '&:hover': {
                      borderColor: isEditing ? 'inherit' : '#1976d2',
                      backgroundColor: isEditing ? 'inherit' : '#e3f2fd'
                    }
                  }}
                  endIcon={isEditing ? <CancelIcon /> : <EditIcon />}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}

export default ProfilePage
