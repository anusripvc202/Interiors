import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'luxe_interiors_jwt_secret_token_2026';

// Helper to sign JWT tokens
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '30d' });
};

// 1. REGISTER CLIENT OR DESIGNER
export async function register(req, res) {
  const { name, email, password, role, preferredStyle, city, styleSpecialty, experience, startingRate, bio } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required registration parameters.' });
  }

  const userRole = role === 'designer' ? 'designer' : 'client';

  try {
    const sanitizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [sanitizedEmail]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email address already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userRole === 'designer') {
      if (!city || !styleSpecialty || !experience || !startingRate) {
        return res.status(400).json({ success: false, message: 'Missing designer profile parameters.' });
      }

      // Generate base designer code from name
      let designerCode = name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      // Check if designer code exists, append random number if needed
      const [existingCodes] = await pool.query('SELECT id FROM designer_profiles WHERE designer_code = ?', [designerCode]);
      if (existingCodes.length > 0) {
        designerCode = `${designerCode}-${Math.floor(Math.random() * 1000)}`;
      }

      // Default avatar URLs
      const avatars = [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
      ];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      // Start transaction
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();

        // 1. Insert into users
        const [userResult] = await connection.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          [name, sanitizedEmail, hashedPassword, 'designer']
        );
        const userId = userResult.insertId;

        // 2. Insert into designer_profiles
        await connection.query(
          `INSERT INTO designer_profiles 
            (user_id, designer_code, role_title, avatar_url, city, style_specialty, rating, reviews_count, experience, starting_rate, bio) 
           VALUES (?, ?, ?, ?, ?, ?, 5.0, 0, ?, ?, ?)`
          ,
          [
            userId,
            designerCode,
            'Design Specialist',
            randomAvatar,
            city,
            styleSpecialty,
            experience,
            Number(startingRate),
            bio || ''
          ]
        );
        
        await connection.commit();

        const token = generateToken({ id: userId, email: sanitizedEmail, role: 'designer', designerId: designerCode });

        return res.status(201).json({
          success: true,
          token,
          user: {
            id: userId,
            name,
            email: sanitizedEmail,
            role: 'designer',
            designerId: designerCode,
            details: {
              id: designerCode,
              name,
              role: 'Design Specialist',
              avatar: randomAvatar,
              city,
              style: styleSpecialty,
              rating: 5.0,
              reviewsCount: 0,
              experience,
              startingRate: Number(startingRate),
              bio: bio || ''
            }
          }
        });

      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }

    } else {
      // Map style names to styles code id
      const styleMap = {
        'Japandi Minimalism': 'japandi',
        'Modern Luxury': 'modern',
        'Classic Parisian': 'parisian',
        'Mid-Century Organic': 'midcentury'
      };
      const styleId = styleMap[preferredStyle] || 'modern';

      // Insert user row
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role, preferred_style, style_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, sanitizedEmail, hashedPassword, 'client', preferredStyle || 'Modern Luxury', styleId]
      );

      const userId = result.insertId;

      // Generate JWT
      const token = generateToken({ id: userId, email: sanitizedEmail, role: 'client' });

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: userId,
          name,
          email: sanitizedEmail,
          role: 'client',
          preferredStyle: preferredStyle || 'Modern Luxury',
          styleId
        }
      });
    }
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ success: false, message: 'Server error during profile creation.' });
  }
}

// 2. SIGN IN
export async function login(req, res) {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Email, password, and portal role are required.' });
  }

  try {
    const sanitizedEmail = email.toLowerCase().trim();

    // Find user in db
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [sanitizedEmail]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const dbUser = users[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Validate role match
    if (dbUser.role !== role) {
      return res.status(403).json({ success: false, message: 'Access denied: Role mismatch.' });
    }

    let payload = { id: dbUser.id, email: dbUser.email, role: dbUser.role };
    let responseUser = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role
    };

    // If designer, join designer profile parameters
    if (dbUser.role === 'designer') {
      const [profiles] = await pool.query('SELECT * FROM designer_profiles WHERE user_id = ?', [dbUser.id]);
      if (profiles.length > 0) {
        const profile = profiles[0];
        payload.designerId = profile.designer_code;
        
        responseUser.designerId = profile.designer_code;
        responseUser.details = {
          id: profile.designer_code,
          name: dbUser.name,
          role: profile.role_title,
          avatar: profile.avatar_url,
          city: profile.city,
          style: profile.style_specialty,
          rating: Number(profile.rating),
          reviewsCount: profile.reviews_count,
          experience: profile.experience,
          startingRate: profile.starting_rate,
          bio: profile.bio
        };
      }
    } else {
      responseUser.preferredStyle = dbUser.preferred_style;
      responseUser.styleId = dbUser.style_id;
    }

    const token = generateToken(payload);

    return res.status(200).json({
      success: true,
      token,
      user: responseUser
    });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ success: false, message: 'Server error during sign in.' });
  }
}

// 3. GET CURRENT PROFILE (verify session)
export async function getMe(req, res) {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, role, preferred_style as preferredStyle, style_id as styleId FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found.' });
    }

    const dbUser = users[0];
    let responseUser = { ...dbUser };

    if (dbUser.role === 'designer') {
      const [profiles] = await pool.query('SELECT * FROM designer_profiles WHERE user_id = ?', [dbUser.id]);
      if (profiles.length > 0) {
        const profile = profiles[0];
        responseUser.designerId = profile.designer_code;
        responseUser.details = {
          id: profile.designer_code,
          name: dbUser.name,
          role: profile.role_title,
          avatar: profile.avatar_url,
          city: profile.city,
          style: profile.style_specialty,
          rating: Number(profile.rating),
          reviewsCount: profile.reviews_count,
          experience: profile.experience,
          startingRate: profile.starting_rate,
          bio: profile.bio
        };
      }
    }

    return res.status(200).json({ success: true, user: responseUser });
  } catch (error) {
    console.error('Fetch me failed:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving details.' });
  }
}

// 4. UPDATE DESIGNER PORTFOLIO
export async function updateDesignerProfile(req, res) {
  if (req.user.role !== 'designer') {
    return res.status(403).json({ success: false, message: 'Forbidden. Access restricted to designers.' });
  }

  const { bio, startingRate, role } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE designer_profiles SET bio = ?, starting_rate = ?, role_title = ? WHERE user_id = ?',
      [bio, startingRate, role, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Designer profile not found to update.' });
    }

    return res.status(200).json({ success: true, message: 'Portfolio settings updated successfully.' });
  } catch (error) {
    console.error('Update designer details failed:', error);
    return res.status(500).json({ success: false, message: 'Server error updating designer details.' });
  }
}
