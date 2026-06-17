import express from 'express';
import { register, login, getMe, updateDesignerProfile, getAllDesigners } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads folder exists (uses /tmp on Vercel due to read-only filesystem)
const uploadDir = process.env.VERCEL ? '/tmp' : './uploads';
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
} catch (err) {
  console.warn('⚠️ Could not create upload directory:', err.message);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Public auth endpoints
router.post('/register', register);
router.post('/login', login);
router.get('/designers', getAllDesigners);
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/api/uploads/${req.file.filename}`;
  return res.json({ success: true, url: fileUrl });
});

// Protected auth endpoints
router.get('/me', protect, getMe);
router.put('/designer/profile', protect, updateDesignerProfile);

export default router;
