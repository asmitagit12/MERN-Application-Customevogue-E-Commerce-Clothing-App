import { Request, Response } from "express";
import Address from "../models/Address";
import { errorResponse, successResponse } from "../helper/responseHelpers";

// Create a new address
export const createAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId,name, streetAddress, city, state, pinCode, country, addressType } = req.body;

        // Validate if userId and other fields are present
        if (!userId) {
            errorResponse(res, 400, "User ID is required");
            return;  // Make sure you return after the response is sent
        }

        if (!streetAddress || !name || !city || !state || !pinCode || !addressType) {
            errorResponse(res, 400, "All address fields are required");
            return;  // Return after sending error response
        }

        const newAddress = new Address({
            userId,
            name,
            streetAddress,
            city,
            state,
            pinCode,
            country: country || "India", // Default to "India" if country is not provided
            addressType,
        });

        await newAddress.save();
        successResponse(res, "Address created successfully", newAddress);
    } catch (error) {
        errorResponse(res, 500, "Server error", error);
    }
};

// Get all addresses for a specific user
export const getUserAddresses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!userId) {
            errorResponse(res, 400, "User ID is required");
            return;
        }

        const addresses = await Address.find({ userId });

        if (!addresses.length) {
            errorResponse(res, 404, "No addresses found for this user");
            return;
        }

        successResponse(res, "Addresses retrieved successfully", addresses);
    } catch (error) {
        errorResponse(res, 500, "Server error", error);
    }
};

// Get a single address by ID
export const getAddressById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            errorResponse(res, 400, "Address ID is required");
            return;
        }

        const address = await Address.findById(id);

        if (!address) {
            errorResponse(res, 404, "Address not found");
            return;
        }

        successResponse(res, "Address retrieved successfully", address);
    } catch (error) {
        errorResponse(res, 500, "Server error", error);
    }
};

// Update an address
export const updateAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            errorResponse(res, 400, "Address ID is required");
            return;
        }

        const updatedAddress = await Address.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAddress) {
            errorResponse(res, 404, "Address not found");
            return;
        }

        successResponse(res, "Address updated successfully", updatedAddress);
    } catch (error) {
        errorResponse(res, 500, "Server error", error);
    }
};

// Delete an address
export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            errorResponse(res, 400, "Address ID is required");
            return;
        }

        const deletedAddress = await Address.findByIdAndDelete(id);

        if (!deletedAddress) {
            errorResponse(res, 404, "Address not found");
            return;
        }

        successResponse(res, "Address deleted successfully");
    } catch (error) {
        errorResponse(res, 500, "Server error", error);
    }
};
