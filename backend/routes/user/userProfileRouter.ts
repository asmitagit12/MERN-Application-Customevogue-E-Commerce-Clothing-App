import express from 'express';
import { getUserProfile, updateUserProfile } from '../../controllers/user/UserProfileController';

const router = express.Router();

// Route for getting user profile
router.get('/:id', getUserProfile);

// Route for updating user profile (using POST)
router.post('/:id', updateUserProfile);

export default router;
