import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for frontend integration
app.use(cors({
  origin: '*', // Allow all origins for dev simplicity, can narrow down to http://localhost:5174/5173 later
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware for JSON payloads (with extended size limit to support fallback base64 uploads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static uploads folder (dynamically routes to /tmp on Vercel)
const uploadDir = process.env.VERCEL ? '/tmp' : path.resolve('uploads');
app.use('/uploads', express.static(uploadDir));
app.use('/api/uploads', express.static(uploadDir));

// API Base check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'LuxeInteriors REST API service is online ✦'
  });
});

// Register router namespace endpoints
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Support Vercel experimentalServices routing (which strips the /api prefix)
if (process.env.VERCEL) {
  app.use('/auth', authRoutes);
  app.use('/bookings', bookingRoutes);
}

// Global fallback 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route path not found.' });
});

// Global internal error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Exception:', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Initialize server listen port listener only when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`\n✦ LuxeInteriors API Server Running on http://localhost:${port} ✦`);
    console.log(`➜  Auth API:     http://localhost:${port}/api/auth`);
    console.log(`➜  Bookings API: http://localhost:${port}/api/bookings\n`);
  });
}

export default app;
