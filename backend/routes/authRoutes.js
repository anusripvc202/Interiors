import express from 'express';
import { register, login, getMe, updateDesignerProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public auth endpoints
router.post('/register', register);
router.post('/login', login);

// Protected auth endpoints
router.get('/me', protect, getMe);
router.put('/designer/profile', protect, updateDesignerProfile);

export default router;
