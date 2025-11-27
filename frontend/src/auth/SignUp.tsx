import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  Divider,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { registerUser } from '../services/auth/authServices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const SignUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  password: z.string().min(2, 'Password must be at least 6 characters')
})

type SignUnFormInputs = z.infer<typeof SignUpSchema>

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignUnFormInputs>({
    resolver: zodResolver(SignUpSchema)
  })
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: SignUnFormInputs) => {
    try {
      const response = await registerUser(data)
      toast.success("Sign Up successful")
      navigate('/auth/signin')
    } catch (error: any) {
      toast.error(
        'Login error:',
        error.response?.data?.message || error.message
      )
    }
  }

  const handleClickShowPassword = () => setShowPassword((prev) => !prev)


  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography sx={{ fontSize: 24, fontWeight: 500, fontFamily: 'Prata, serif' }} gutterBottom>
          Sign Up
        </Typography>
        <Box flex={1}>
          <Divider sx={{ bgcolor: '#808080' }} />
        </Box>
      </Stack>
      <Typography variant='caption' pb={1}>
        Fill the below fields to create an account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0.5} rowSpacing={1} pr={0}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            {/* First Name */}

            <Controller
              name='firstName'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='First Name'
                  type='text'
                  variant='outlined'
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            {/* Last Name */}

            <Controller
              name='lastName'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='Last Name'
                  type='text'
                  variant='outlined'
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {/* Email */}
            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='Email'
                  type='email'
                  variant='outlined'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {/* Mobile */}
            <Controller
              name='mobile'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='Mobile No.'
                  type='tel'
                  variant='outlined'
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {/* Password */}
            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  variant='outlined'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='body2' pt={0.5}>
              <input type='checkbox' /> I agree to the Terms and Conditions
            </Typography>
          </Box>

          <Button
            fullWidth
            variant='contained'
            color='primary'
            type='submit'
            sx={{
              mt: 3,
              py: 1,
              background: 'linear-gradient(to right, #00c6fb, #005bea)',
              boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to right, #00c6fb, #005bea)',
                boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            Sign Up
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Stack
              direction={'row'}
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                mb: 1
              }}
            >
              <Link href='/auth/otp-login' sx={{ fontSize: 15 }}>
                Sign Up Using Mobile
              </Link>
            </Stack>

            <Stack direction={'row'} alignItems='center' spacing={2}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant='body2'>OR</Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Stack>

            <Stack
              direction={'row'}
              spacing={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 1
              }}
            >
              <Typography
                style={{
                  textDecoration: 'none',
                  color: '#38A6FA',
                  fontSize: 15,
                  fontFamily: 'poppins'
                }}
              >
                Already have an account?
              </Typography>
              <Link
                href='/auth/signin'
                underline='always'
                sx={{ fontSize: 16 }}
              >
                Sign In
              </Link>
            </Stack>
          </Box>
        </Grid>
      </form>
    </Box>
  )
}

export default SignUp
