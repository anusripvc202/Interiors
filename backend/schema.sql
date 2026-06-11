-- CREATE LUXE INTERIORS DATABASE SCHEMA
CREATE DATABASE IF NOT EXISTS luxe_interiors_db;
USE luxe_interiors_db;

-- Drop tables in order of foreign key dependencies to ensure a clean slate
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS designer_profiles;
DROP TABLE IF EXISTS users;

-- 1. USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- bcrypt encrypted hash
    role ENUM('client', 'designer') DEFAULT 'client',
    preferred_style VARCHAR(255) NULL, -- only for role='client'
    style_id VARCHAR(50) NULL, -- only for role='client'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DESIGNER PROFILES TABLE
CREATE TABLE designer_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    designer_code VARCHAR(50) UNIQUE NOT NULL, -- used for login matching (e.g. 'aria-chen')
    role_title VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500) NULL,
    city VARCHAR(100) NOT NULL,
    style_specialty VARCHAR(255) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    experience VARCHAR(50) NOT NULL,
    starting_rate INT NOT NULL,
    bio TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BOOKINGS TABLE
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_notes TEXT NULL,
    space_type VARCHAR(255) NOT NULL,
    designer_id INT NOT NULL, -- links to users(id) of the designer
    date VARCHAR(100) NOT NULL,
    time VARCHAR(50) NOT NULL,
    status ENUM('Scheduled', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    cost VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- INDEX KEYS FOR PERFORMANCE OPTIMIZATION
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_booking_client_email ON bookings(client_email);
CREATE INDEX idx_booking_designer_id ON bookings(designer_id);

-- ==========================================
-- PRE-SEEDING DEMO DATA
-- Default password is 'password' hashed with bcrypt: '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46'
-- ==========================================

-- Insert Users (1 client, 4 designers)
INSERT INTO users (id, name, email, password, role, preferred_style, style_id) VALUES
(1, 'Eleanor Vance', 'client@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'client', 'Japandi Minimalism', 'japandi'),
(2, 'Aria Chen', 'aria@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(3, 'Julian Mercer', 'julian@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(4, 'Sophia Vance', 'sophia@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL),
(5, 'Marcus Sterling', 'marcus@luxe.com', '$2a$10$tM78wN.Q/X3m9sP8qf0Ule2T3v17H2c87gX3x8Q87e4L68V423C46', 'designer', NULL, NULL);

-- Insert Designer profiles linking to the users
INSERT INTO designer_profiles (user_id, designer_code, role_title, avatar_url, city, style_specialty, rating, reviews_count, experience, starting_rate, bio) VALUES
(2, 'aria-chen', 'Principal Designer & Partner', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 'Bangalore', 'Japandi Minimalism', 4.90, 38, '8+ Years', 15000, 'Aria blends Japanese functionality with Scandinavian cozy elements to create restful, modern residential spaces.'),
(3, 'julian-mercer', 'Principal Architect', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', 'Mumbai', 'Modern Luxury', 5.00, 52, '12+ Years', 25000, 'Julian is renowned for creating striking, upscale environments using fine metals, Italian marbles, and integrated smart lighting.'),
(4, 'sophia-vance', 'Senior Curation Specialist', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', 'Delhi', 'Classic Parisian', 4.80, 29, '6 Years', 14000, 'Sophia blends historical elegance with modern styling, focusing on ornate wall moldings, vintage mirrors, and bold colors.'),
(5, 'marcus-sterling', 'Senior Architectural Stylist', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', 'Bangalore', 'Mid-Century Organic', 4.70, 41, '9+ Years', 16000, 'Marcus focuses on mid-century aesthetics, bringing warm walnut woods, clean biophilic integration, and retro styling to spaces.');

-- Insert Bookings (2 for client Eleanor Vance, 1 extra)
INSERT INTO bookings (client_name, client_email, client_phone, client_notes, space_type, designer_id, date, time, status, cost) VALUES
('Eleanor Vance', 'client@luxe.com', '+91 98765 43210', 'Master suite layout focus.', 'Living Room', 2, 'Jun 18, 2026', '02:00 PM', 'Scheduled', '₹4,32,000'),
('Eleanor Vance', 'client@luxe.com', '+91 98765 43210', 'Italian marble selections consultation.', 'Gourmet Kitchen', 3, 'Jul 05, 2026', '11:30 AM', 'Completed', '₹9,72,000'),
('Kabir Malhotra', 'kabir@outlook.com', '+91 98765 00112', 'Retro teak sideboard spacing.', 'Bedroom Sanctuary', 2, 'Jun 20, 2026', '03:30 PM', 'Scheduled', '₹3,00,000');
