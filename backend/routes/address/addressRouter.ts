import express from "express";
import {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../../controllers/addressController";

const router = express.Router();

// Create a new address
router.post("/", createAddress);

// Get all addresses for a user
router.get("/:userId", getUserAddresses);

// Get a single address by ID
router.get("/single/:id", getAddressById);

// Update an address
router.put("/:id", updateAddress);

// Delete an address
router.delete("/:id", deleteAddress);

export default router;
