

import React from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  Divider
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { loginUser } from '../services/auth/authServices'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContext'
import toast from 'react-hot-toast'
import { loginAction } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../services/user/userService'

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(2, 'Password must be at least 6 characters')
})

interface DecodedToken {
  userId: any
  role: string
}

type SignInFormInputs = z.infer<typeof SignInSchema>

const SignIn: React.FC = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(SignInSchema)
  })

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const response = await loginUser(data)
      const token = response.data.token
      sessionStorage.setItem('authToken', token)
      sessionStorage.setItem('isAuth', JSON.stringify(true))
      const decodedToken = jwtDecode<DecodedToken>(token)


      const userId = decodedToken.userId;
      const userRole = decodedToken.role;

      // Fetch the full user data based on userId (you'll need an API call for this)
      const userResponse = await getUserProfile(userId); // Assuming you have a function to fetch user details
      const user = userResponse.data; // Assuming userResponse has the full user details like name, email, etc.
      console.log(user)
      // Dispatch the login action with the user details and token
      dispatch(loginAction({ others: user, token }));
      login(token)
      console.log(decodedToken, token)
      if (userRole === 'admin') {
        navigate('/admin')
      } else {
        navigate('/cart')
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to login'
      console.error('Login error:', errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography sx={{ fontSize: 24, fontWeight: 500, fontFamily: 'Prata, serif' }} gutterBottom>
          Login
        </Typography>
        <Box flex={1}>
          <Divider sx={{ bgcolor: '#808080' }} />
        </Box>
      </Stack>
      <Typography variant='caption' pb={1}>
        Fill the below fields to continue
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pr={0} mt={1}>
          <Stack spacing={2} mt={1} mb={1}>
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
                  type='password'
                  variant='outlined'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Stack>

          <Box display='flex' justifyContent='flex-end' alignItems='center'>
            <Link href='/auth/forgot-password' underline='none'>
              Forgot Password?
            </Link>
          </Box>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
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
            Login
          </Button>
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
              Login Using Mobile
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
              mt: 2
            }}
          >
            <Typography
              style={{
                textDecoration: 'none',
                color: '#38A6FA',
                fontSize: 14,
                fontFamily: 'poppins'
              }}
            >
              Don't have an account?
            </Typography>
            <Link href='/auth/signup' underline='always' sx={{ fontSize: 15 }}>
              Create Account
            </Link>
          </Stack>
        </Box>
      </form>
    </Box>
  )
}

export default SignIn
