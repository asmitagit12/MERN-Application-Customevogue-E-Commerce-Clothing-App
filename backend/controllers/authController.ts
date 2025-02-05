import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { errorResponse, successResponse } from '../helper/responseHelpers'

const secretKey = process.env.JWT_SECRET

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in the environment variables.')
}

// SignUp Route
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, mobile, password, role } = req.body

  try {
    // Check if the email or mobile already exists
    const existingUserByEmail = await User.findOne({ email })

    if (existingUserByEmail) {
      errorResponse(res, 400, 'Email already in use')
      return
    }

    const existingUserByMobile = await User.findOne({ mobile })
    if (existingUserByMobile) {
      errorResponse(res, 400, 'Mobile number is already in use')
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user and save to the database
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      role: role || 'user' // Default role is 'user'
    })

    await newUser.save()

    // Return success response
    successResponse(res, 'User created successfully')
  } catch (error) {
    errorResponse(res, 500, 'Error creating user')
  }
}

// SignIn Route
export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      errorResponse(res, 400, 'User not found')
      return
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      errorResponse(res, 400, 'Invalid credentials')
      return
    }

    // Generate JWT token with user role and id
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      secretKey, // You should use an environment variable for this secret key
      { expiresIn: '1h' }
    )

    // Return success response with token
    successResponse(res, 'Login successful', { token })
  } catch (error) {
    errorResponse(res, 500, 'Error signing in')
  }
}
