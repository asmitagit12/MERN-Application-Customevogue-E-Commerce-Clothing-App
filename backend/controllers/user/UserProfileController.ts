import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../helper/responseHelpers';
import User from '../../models/User';

// Controller for getting a user by ID
export const getUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    // Fetch user by ID and select only the desired fields
    const user = await User.findById(id).select('firstName lastName email mobile _id'); // Only select these fields
    
    if (!user) {
      errorResponse(res, 404, 'User not found');
      return;
    }
    
    successResponse(res, 'User fetched successfully', user);
    
  } catch (error) {
    errorResponse(res, 500, 'Error fetching user');
  }
};

// Controller for updating a user's profile using POST
export const updateUserProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email, mobile } = req.body;
  
    try {
      // Find the user by ID and update the relevant fields
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, email, mobile },
        { new: true } // Return the updated user document
      );
  
      if (!updatedUser) {
        errorResponse(res, 404, 'User not found');
        return;
      }
  
      successResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
      errorResponse(res, 500, 'Error updating user profile');
    }
  };
