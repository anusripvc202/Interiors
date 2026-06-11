import express from 'express';
import { 
  createBooking, getClientBookings, getDesignerBookings, 
  updateBookingStatus, cancelBooking 
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All booking routes require a valid user session token
router.use(protect);

router.post('/', createBooking);
router.get('/client', getClientBookings);
router.get('/designer', getDesignerBookings);
router.put('/:id/status', updateBookingStatus);
router.put('/:id/cancel', cancelBooking);

export default router;
