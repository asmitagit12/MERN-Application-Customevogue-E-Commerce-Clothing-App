import express from 'express';
import { signIn, signUp } from '../../controllers/authController';
import { authenticate, authorizeRole } from '../../middleware/authMiddleware';


const router = express.Router();

// POST /signup
router.post('/signup', signUp);

// POST /signin
router.post('/signin', signIn);

// Example of a protected route for admin
router.get('/admin', authenticate, authorizeRole(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

// Example of a protected route for user
router.get('/user', authenticate, authorizeRole(['user', 'admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome, User!' });
});

export default router;
