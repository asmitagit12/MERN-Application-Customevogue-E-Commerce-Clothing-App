import { Request, Response } from 'express'
import User from '../models/User'
import { errorResponse, successResponse } from '../helper/responseHelpers'

// Controller for getting all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find() // Fetch all users from the database
    successResponse(res, 'All users fetched', users)
  } catch (error) {
    errorResponse(res, 500, 'Error fetching users')
  }
}

// Controller for getting a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findById(id) // Fetch a user by their ID
    if (!user) {
      errorResponse(res, 404, 'User not found')
      return
    }
    successResponse(res, 'user fetched', user)
  } catch (error) {
    errorResponse(res, 500, 'Error fetching user')
  }
}
