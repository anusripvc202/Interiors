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

// Body parser middleware for JSON payloads
app.use(express.json());

// Serve static uploads folder
app.use('/uploads', express.static(path.resolve('uploads')));

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

// Initialize server listen port listener
app.listen(port, () => {
  console.log(`\n✦ LuxeInteriors API Server Running on http://localhost:${port} ✦`);
  console.log(`➜  Auth API:     http://localhost:${port}/api/auth`);
  console.log(`➜  Bookings API: http://localhost:${port}/api/bookings\n`);
});
