import { Request, Response } from 'express'
import User from '../models/User'
import { errorResponse, successResponse } from '../helper/responseHelpers'
import Address from '../models/Address';

// Controller for getting all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Step 1: Get all users with role 'user'
    const users = await User.find({ role: 'user' }).lean(); // Fetch only users with role 'user'

    // Step 2: Get all addresses
    const addresses = await Address.find();

    // Step 3: Attach addresses to corresponding users
    const usersWithAddresses = users.map(user => {
      const userAddresses = addresses.filter(addr => addr.userId.toString() === user._id.toString());
      return {
        ...user,
        addresses: userAddresses
      };
    });

    successResponse(res, 'All users with addresses fetched', usersWithAddresses);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Error fetching users');
  }
};


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
