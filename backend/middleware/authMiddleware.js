import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'luxe_interiors_jwt_secret_token_2026';

export function protect(req, res, next) {
  let token;

  // Retrieve token from authorization header (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Split the header to extract only the hash token
      token = req.headers.authorization.split(' ')[1];

      // Decode the payload and verify key integrity
      const decoded = jwt.verify(token, jwtSecret);

      // Attach decoded identity user payload to request
      req.user = decoded;
      
      return next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token validation failed.' 
      });
    }
  }

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, session token is missing.' 
    });
  }
}
